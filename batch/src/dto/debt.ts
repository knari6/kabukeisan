import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class DebtDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(comapnyId: number): Prisma.DebtCreateInput {
    return {
      company: {
        connect: {
          id: comapnyId,
        },
      },
      interestBearingDebt: this.financialData.balanceSheet.liabilities.debt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
