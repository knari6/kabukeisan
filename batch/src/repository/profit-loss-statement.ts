import { PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { ProfitLossStatementDto } from "../dto/profit-loss-statement";

export class ProfitLossStatementRepository {
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
    console.log("this is profit loss");
    const profitLossStatementDto = new ProfitLossStatementDto(this.data);
    const statement = await this.prismaClient.financialStatements.findFirst({
      where: {
        company: {
          code: this.data.information.code,
        },
        fiscalYear: this.year,
        quarterType: this.quarterType,
      },
      select: {
        id: true,
      },
    });
    console.log(statement);
    if (!statement) {
      throw new Error("Statement not found");
    }

    const profitLossStatement = profitLossStatementDto.dto(statement.id);
    await this.prismaClient.profitLossStatements.create({
      data: profitLossStatement,
    });
  }
}
