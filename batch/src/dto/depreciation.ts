import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class DepriciationDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): Prisma.CapitalExpenditureCreateInput {
    return {
      statement: {
        connect: {
          id: statementId,
        },
      },
      depreciation: this.financialData.capitalAndRDExpenses.depreciation,
      amortization: this.financialData.capitalAndRDExpenses.amortization,
      depreciationAmortization:
        this.financialData.capitalAndRDExpenses.depreciation +
        this.financialData.capitalAndRDExpenses.amortization,
      capitalExpenditure:
        this.financialData.capitalAndRDExpenses.equipmentInvestment,
      researchAndDevelopment:
        this.financialData.capitalAndRDExpenses.researchAndDevelopmentExpenses,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
