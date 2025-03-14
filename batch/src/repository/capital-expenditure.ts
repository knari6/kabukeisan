import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { CapitalExpenditureDto } from "../dto/capital-expenditure";

export class CapitalExpenditureRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }

  public async write() {
    const capitalExpenditureDto = new CapitalExpenditureDto(this.data);
    const statement = await this.prismaClient.financialStatements.findFirst({
      where: {
        company: {
          code: this.data.information.code,
        },
        fiscalYear: this.data.information.year,
        quarterType: this.data.information.quarterType,
      },
      select: {
        id: true,
      },
    });
    if (!statement) {
      throw new Error("Statement not found");
    }
    const capitalExpenditure = capitalExpenditureDto.dto(statement.id);
    await this.prismaClient.capitalExpenditures.create({
      data: capitalExpenditure,
    });
  }
}
