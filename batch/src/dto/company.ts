import { FinancialData } from "../libs/interfaces";

type CompanyDtoType = {
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CompanyDto {
  public dto(data: FinancialData): CompanyDtoType {
    return {
      code: data.information.code,
      name: data.information.companyName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
