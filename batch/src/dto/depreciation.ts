import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

type DepriciationDtoType = {
  statementId: number;
  depreciation: number;
  amortization: number;
  depreciationAndAmortization: number;
  capitalExpenditure: number;
  researchAndDevelopment: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Depriciation {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.financialData = financialData;
    this.prismaClient = prismaClient;
  }

  public dto(statementId: number): DepriciationDtoType {
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
