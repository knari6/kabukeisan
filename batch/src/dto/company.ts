import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class CompanyDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(): Prisma.CompaniesCreateInput {
    return {
      code: this.financialData.information.code,
      name: this.financialData.information.companyName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
