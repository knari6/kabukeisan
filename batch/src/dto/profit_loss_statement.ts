import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class ProfitLossStatementDto {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.prismaClient = prismaClient;
    this.financialData = financialData;
  }

  public dto() {
    return {
      sale: this.financialData.incomeStatement.netSales,
      netSale:
        this.financialData.incomeStatement.netSales -
        this.financialData.incomeStatement.costOfSales,
      operatingIncome: this.financialData.incomeStatement.operatingIncome,
      ordinaryIncome: this.financialData.incomeStatement.ordinaryIncome,
      profitBeforeTax:
        this.financialData.incomeStatement.incomeBeforeIncomeTaxes,
      tax: this.financialData.incomeStatement.tax,
      profit: this.financialData.incomeStatement.profitLoss,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
