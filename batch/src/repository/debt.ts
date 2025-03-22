import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { DebtDto } from "../dto/debt";

export class DebtRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }

  public async write() {
    const debtDto = new DebtDto(this.data);
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
    const debt = debtDto.dto(statement.id);
    try {
      await this.prismaClient.debt.create({
        data: debt,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        error: error,
      };
    }
  }
  public async findFirst(debtWhereInput: Prisma.DebtWhereInput) {
    try {
      return this.prismaClient.debt.findFirst({
        where: debtWhereInput,
      });
    } catch (error) {
      throw `${error}会社情報の取得に失敗しました。`;
    }
  }
}
