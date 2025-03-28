import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { CompanyDto } from "../dto/company";

export class CompanyRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;

  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }

  public async write() {
    const companyDto = new CompanyDto(this.data);
    const company = companyDto.dto();
    try {
      await this.prismaClient.companies.create({
        data: company,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        fiscalYear: this.data.information.year,
        error: error,
      };
    }
  }

  public async findFirst(companyWhereInput: Prisma.CompaniesWhereInput) {
    try {
      return this.prismaClient.companies.findFirst({
        where: companyWhereInput,
      });
    } catch (error) {
      throw `${error}会社情報の取得に失敗しました。`;
    }
  }
}
