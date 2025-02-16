import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

type DebtDtoType = {
  debt: number;
  created_at: Date;
  updated_at: Date;
};
export class DebtDto {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.prismaClient = prismaClient;
    this.financialData = financialData;
  }

  public dto(): DebtDtoType {
    return {
      debt: this.financialData.balanceSheet.liabilities.debt,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
