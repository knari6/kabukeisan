import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

type DepriciationDtoType = {
  depreciation: number;
  amortization: number;
  research_and_development: number;
  equipment_investment: number;
  created_at: Date;
  updated_at: Date;
};

export class Depriciation {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  constructor(prismaClient: PrismaClient, financialData: FinancialData) {
    this.financialData = financialData;
    this.prismaClient = prismaClient;
  }

  public dto(): DepriciationDtoType {
    return {
      depreciation: this.financialData.capitalAndRDExpenses.depreciation,
      amortization: this.financialData.capitalAndRDExpenses.amortization,
      research_and_development:
        this.financialData.capitalAndRDExpenses.researchAndDevelopmentExpenses,
      equipment_investment:
        this.financialData.capitalAndRDExpenses.equipmentInvestment,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
