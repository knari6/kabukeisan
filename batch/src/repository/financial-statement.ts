import { PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { FinancialStatementDto } from "../dto/financial-statement";

export class FinancialStatementRpository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  private readonly year: string;
  private readonly quarterType: QuarterType;
  constructor(
    prismaClient: PrismaClient,
    data: FinancialData,
    year: string,
    quarterType: QuarterType
  ) {
    this.prismaClient = prismaClient;
    this.data = data;
    this.year = year;
    this.quarterType = quarterType;
  }

  public async write() {
    const financialStatementDto = new FinancialStatementDto(
      this.prismaClient,
      this.data,
      this.year,
      this.quarterType
    );
    const company = await this.prismaClient.companies.findFirst({
      where: {
        code: this.data.information.code,
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
