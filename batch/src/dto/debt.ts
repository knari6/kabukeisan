import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

type DebtDtoType = {
  statementId: number;
  interestBearingDebt: number;
  createdAt: Date;
  updatedAt: Date;
};
export class DebtDto {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.prismaClient = prismaClient;
    this.financialData = financialData;
  }

  public dto(statementId: number): DebtDtoType {
    return {
      statementId: statementId,
      interestBearingDebt: this.financialData.balanceSheet.liabilities.debt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
