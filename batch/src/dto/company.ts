import { FinancialData } from "../libs/interfaces";

type CompanyDtoType = {
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export class CompanyDto {
  public dto(data: FinancialData): CompanyDtoType {
    return {
      code: data.information.code,
      name: data.information.companyName,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
