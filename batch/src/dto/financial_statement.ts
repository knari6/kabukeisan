import { PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";

export class FinancialStatementDto {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  /** FinancialStatementsに登録するデータのためのDTO */
  public dto(data: FinancialData, year: string, quarterType: QuarterType) {
    return {
      code: data.information.code,
      name: data.information.companyName,
      year: year,
      quarterType: quarterType,
      stockAmount: data.stockInfo.stockAmount,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
