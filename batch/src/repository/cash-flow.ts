import { Prisma, PrismaClient } from "@prisma/client";
import { CashFlowDto } from "../dto/cash-flow";
import { FinancialData } from "../libs/interfaces";

export class CashFlowRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  public constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }
  public async write() {
    const cashFlowDto = new CashFlowDto(this.data);
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
    const cashFlow = cashFlowDto.dto(statement.id);
    try {
      await this.prismaClient.cashFlow.create({
        data: cashFlow,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        error: error,
      };
    }
  }

  public async findFirst(cashFlowWhereInput: Prisma.CashFlowWhereInput) {
    try {
      return this.prismaClient.cashFlow.findFirst({
        where: cashFlowWhereInput,
      });
    } catch (error) {
      throw `${error}会社情報の取得に失敗しました。`;
    }
  }
}
