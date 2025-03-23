import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class ProfitLossStatementDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(companyId: number): Prisma.ProfitLossCreateInput {
    return {
      company: {
        connect: {
          id: companyId,
        },
      },
      sale: this.financialData.incomeStatement.sale,
      grossProfit:
        this.financialData.incomeStatement.sale -
        this.financialData.incomeStatement.costOfSale,
      operatingProfit: this.financialData.incomeStatement.operatingIncome,
      ordinaryProfit: this.financialData.incomeStatement.ordinaryIncome,
      netIncome: this.financialData.incomeStatement.profitLoss,
      profitBeforeTax: this.financialData.incomeStatement.incomeBeforeIncomeTax,
      tax: this.financialData.incomeStatement.tax,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
