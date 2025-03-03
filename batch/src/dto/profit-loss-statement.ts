import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

type ProfitLossStatementDtoType = {
  statementId: number;
  sale: number;
  netSale: number;
  operatingIncome: number;
  ordinaryIncome: number;
  profitBeforeTax: number;
  tax: number;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
};

export class ProfitLossStatementDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): ProfitLossStatementDtoType {
    return {
      statementId: statementId,
      sale: this.financialData.incomeStatement.sales,
      netSale:
        this.financialData.incomeStatement.sales -
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
