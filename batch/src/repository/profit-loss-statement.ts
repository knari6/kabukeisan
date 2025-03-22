import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";
import { ProfitLossStatementDto } from "../dto/profit-loss-statement";

export class ProfitLossRepository {
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
    const profitLossStatementDto = new ProfitLossStatementDto(this.data);
    const statement = await this.prismaClient.companies.findFirst({
      where: {
        code: this.data.information.code,
        fiscalYear: this.year,
        quarterType: this.quarterType,
      },
      select: {
        id: true,
      },
    });
    if (!statement) {
      throw new Error("Statement not found");
    }

    const profitLossStatement = profitLossStatementDto.dto(statement.id);
    try {
      await this.prismaClient.profitLoss.create({
        data: profitLossStatement,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        error: error,
      };
    }
  }

  public async findFirst(profitLossWhereInput: Prisma.ProfitLossWhereInput) {
    try {
      return this.prismaClient.profitLoss.findFirst({
        where: profitLossWhereInput,
      });
    } catch (error) {
      throw `${error}会社情報の取得に失敗しました。`;
    }
  }
}
