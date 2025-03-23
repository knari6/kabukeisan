import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class CapitalExpenditureDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(companyId: number): Prisma.CapitalExpenditureCreateInput {
    return {
      company: {
        connect: {
          id: companyId,
        },
      },
      depreciation: this.financialData.capitalExpenditure.depreciation,
      amortization: this.financialData.capitalExpenditure.amortization,
      depreciationAmortization:
        this.financialData.capitalExpenditure.depreciation +
        this.financialData.capitalExpenditure.amortization,
      capitalExpenditure:
        this.financialData.capitalExpenditure.equipmentInvestment,
      researchAndDevelopment:
        this.financialData.capitalExpenditure.researchAndDevelopmentExpense,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
