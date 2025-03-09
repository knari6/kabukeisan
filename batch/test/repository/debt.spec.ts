import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "../../src/services/prisma.service";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";
import { DebtRepository } from "../../src/repository/debt";
import { DBHelper } from "../helper/db-helper";
import { financialTestData } from "../dto/financial-data";
import { Decimal } from "@prisma/client/runtime/library";

describe.sequential("DebtRepository", () => {
  let prismaClient: PrismaClient;
  let prismaService: PrismaService;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let debtRepository: DebtRepository;
  let financialStatement: { id: number } | null;
  let debt: { id: number; interestBearingDebt: Decimal } | null;

  beforeEach(async () => {
    // 新しいPrismaClientインスタンスを作成
    prismaClient = new PrismaClient();
    prismaService = new PrismaService();

    // リポジトリの初期化
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
    financialStatementRepository = new FinancialStatementRpository(
      prismaClient,
      financialTestData,
      financialTestData.information.year,
      financialTestData.information.quarterType
    );
    debtRepository = new DebtRepository(prismaClient, financialTestData);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
    await prismaService.$disconnect();
  });

  describe("write", () => {
    beforeEach(async () => {
      // トランザクション内でデータを作成
      await prismaClient.$transaction(async (tx) => {
        // 会社を作成
        await companyRepository.write();

        // 会社が作成されたことを確認
        const company = await prismaClient.companies.findFirst({
          where: { code: financialTestData.information.code },
        });
        if (!company) throw new Error("Company not created");

        // 財務諸表を作成
        await financialStatementRepository.write();

        // 財務諸表が作成されたことを確認
        financialStatement = await prismaClient.financialStatements.findFirst({
          where: {
            company: { code: financialTestData.information.code },
            fiscalYear: financialTestData.information.year,
            quarterType: financialTestData.information.quarterType,
          },
          select: { id: true },
        });
        if (!financialStatement)
          throw new Error("Financial statement not created");

        // 負債情報を作成
        await debtRepository.write();
      });
      if (!financialStatement)
        throw new Error("Financial statement not created");

      // 作成された負債情報を取得
      debt = await prismaClient.debtStatements.findFirst({
        where: { statementId: financialStatement.id },
        select: { id: true, interestBearingDebt: true },
      });
    });

    it("DBにデータを登録できること", () => {
      expect(debt).not.toBeNull();
      expect(Number(debt?.interestBearingDebt)).toBe(
        financialTestData.balanceSheet.liabilities.debt
      );
    });
  });
});
