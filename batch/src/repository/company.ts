import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
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
    await this.prismaClient.companies.create({
      data: company,
    });
  }
}
