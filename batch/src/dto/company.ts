import { FinancialData } from "../libs/interfaces";

type CompanyDtoType = {
  code: string;
  name: string;
  year: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CompanyDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(): CompanyDtoType {
    return {
      code: this.financialData.information.code,
      name: this.financialData.information.companyName,
      year: this.financialData.information.year,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
