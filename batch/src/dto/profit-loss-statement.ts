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
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public dto(
    data: FinancialData,
    statementId: number
  ): ProfitLossStatementDtoType {
    return {
      statementId: statementId,
      sale: data.incomeStatement.netSales,
      netSale: data.incomeStatement.netSales - data.incomeStatement.costOfSales,
      operatingIncome: data.incomeStatement.operatingIncome,
      ordinaryIncome: data.incomeStatement.ordinaryIncome,
      profitBeforeTax: data.incomeStatement.incomeBeforeIncomeTaxes,
      tax: data.incomeStatement.tax,
      profit: data.incomeStatement.profitLoss,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
