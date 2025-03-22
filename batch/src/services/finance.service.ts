import { PrismaClient } from "@prisma/client";
import { BalanceSheetRepository } from "../repository/balance-sheet";
import { CapitalExpenditureRepository } from "../repository/capital-expenditure";
import { CashFlowRepository } from "../repository/cash-flow";
import { CompanyRepository } from "../repository/company";
import { DebtRepository } from "../repository/debt";
import { ProfitLossRepository } from "../repository/profit-loss-statement";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { LogClient } from "../libs/log";

export class FinanceService {
  private readonly companyRepository: CompanyRepository;
  private readonly profitLossRepository: ProfitLossRepository;
  private readonly balanceSheetRepository: BalanceSheetRepository;
  private readonly cashFlowRepository: CashFlowRepository;
  private readonly capitalExpenditureRepository: CapitalExpenditureRepository;
  private readonly debtRepository: DebtRepository;
  private readonly data: FinancialData;
  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.data = data;
    this.companyRepository = new CompanyRepository(prismaClient, data);

    this.balanceSheetRepository = new BalanceSheetRepository(
      prismaClient,
      data
    );

    this.profitLossRepository = new ProfitLossRepository(
      prismaClient,
      data,
      data.information.year,
      data.information.quarterType
    );

    this.cashFlowRepository = new CashFlowRepository(prismaClient, data);

    this.capitalExpenditureRepository = new CapitalExpenditureRepository(
      prismaClient,
      data
    );

    this.debtRepository = new DebtRepository(prismaClient, data);
  }

  /**
   * 各テーブルにデータ書き込む
   */
  public async create(): Promise<void> {
    const log = new LogClient();
    const logContents = {
      銘柄コード: this.data.information.code,
      会社名: this.data.information.companyName,
    };
    try {
      let company = await this.companyRepository.findFirst({
        code: this.data.information.code,
        fiscalYear: this.data.information.year,
        quarterType: this.data.information.quarterType,
      });
      if (!company) {
        await this.companyRepository.write();
        company = await this.companyRepository.findFirst({
          code: this.data.information.code,
          fiscalYear: this.data.information.year,
          quarterType: this.data.information.quarterType,
        });
      }
      if (!company) throw new Error("会社情報の登録に失敗しました");
      const companyId = company.id;

      const [balanceSheet, profitLoss, cashFlow, capitalExpenditure, debt] =
        await Promise.all([
          await this.balanceSheetRepository.findFirst({ companyId }),
          await this.profitLossRepository.findFirst({ companyId }),
          await this.cashFlowRepository.findFirst({ companyId }),
          await this.capitalExpenditureRepository.findFirst({ companyId }),
          await this.debtRepository.findFirst({ companyId }),
        ]);

      await Promise.all([
        !balanceSheet && (await this.balanceSheetRepository.write()),
        !profitLoss && (await this.profitLossRepository.write()),
        !cashFlow && (await this.cashFlowRepository.write()),
        !debt && (await this.debtRepository.write()),
        !capitalExpenditure &&
          (await this.capitalExpenditureRepository.write()),
      ]);
      log.info("データの書き込みに成功しました", logContents);
    } catch (error) {
      log.error("", "", error);
      throw new Error("データの書き込みに失敗しました");
    }
  }
}
