import { PrismaClient } from "@prisma/client";
import { FinancialStatement } from "../libs/interfaces";

export class CompaniesRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public dto(data: FinancialStatement) {
    return {
      code: data.information.code,
      year: data.information.fiscalPeriod,
      name: data.information.companyName,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public async write(data: FinancialStatement) {
    const company = this.dto(data);
    await this.prismaClient.companies.create({
      data: company,
    });
  }
}
