import { Prisma, PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";

export class FinancialStatementDto {
  private readonly prismaClient: PrismaClient;
  private readonly financialData: FinancialData;
  private readonly year: string;
  private readonly quarterType: QuarterType;
  constructor(
    prismaClient: PrismaClient,
    financialData: FinancialData,
    year: string,
    quarterType: QuarterType
  ) {
    this.prismaClient = prismaClient;
    this.financialData = financialData;
    this.year = year;
    this.quarterType = quarterType;
  }

  /** FinancialStatementsに登録するデータのためのDTO */
  public dto(): Prisma.FinancialStatementsCreateInput {
    return {
      company: {
        connect: {
          code: this.financialData.information.code,
        },
      },
      fiscalYear: this.year,
      quarterType: this.quarterType,
      stockAmount: this.financialData.stockInfo.stockAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
