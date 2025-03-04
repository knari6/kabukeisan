import { PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { FinancialStatementDto } from "../dto/financial-statement";

export class FinancialStatementRpository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async write(
    data: FinancialData,
    year: string,
    quarterType: QuarterType
  ) {
    const financialStatementDto = new FinancialStatementDto(
      this.prismaClient,
      data,
      year,
      quarterType
    );
    const company = await this.prismaClient.companies.findFirst({
      where: {
        code: data.information.code,
      },
      select: {
        id: true,
      },
    });
    if (!company) {
      throw new Error("Company not found");
    }
    const financialStatement = financialStatementDto.dto();
    await this.prismaClient.financialStatements.create({
      data: {
        ...financialStatement,
        company: {
          connect: {
            id: company.id,
          },
        },
      },
    });
  }
}
