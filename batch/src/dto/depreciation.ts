import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class Depriciation {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.financialData = financialData;
    this.prismaClient = prismaClient;
  }

  public dto(statementId: number) {
    return {
      statementId: statementId,
      depreciation: this.financialData.capitalAndRDExpenses.depreciation,
      amortization: this.financialData.capitalAndRDExpenses.amortization,
      depreciationAndAmortization:
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
