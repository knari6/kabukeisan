import { Prisma, PrismaClient } from "@prisma/client";
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
    const statement = await this.prismaClient.companies.findFirst({
      where: {
        code: this.data.information.code,

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
    try {
      await this.prismaClient.capitalExpenditure.create({
        data: capitalExpenditure,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        error: error,
      };
    }
  }

  public async findFirst(
    capitalExpenditureWhereInput: Prisma.CapitalExpenditureWhereInput
  ) {
    try {
      return this.prismaClient.capitalExpenditure.findFirst({
        where: capitalExpenditureWhereInput,
      });
    } catch (error) {
      throw `${error}会社情報の取得に失敗しました。`;
    }
  }
}
