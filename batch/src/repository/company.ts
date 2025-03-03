import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { CompanyDto } from "../dto/company";

export class CompanyRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async write(data: FinancialData) {
    const companyDto = new CompanyDto();
    const company = companyDto.dto(data);
    await this.prismaClient.companies.create({
      data: company,
    });
  }
}
