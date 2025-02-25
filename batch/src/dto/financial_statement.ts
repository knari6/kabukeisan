import { PrismaClient } from "@prisma/client";
import { FinancialData, QuarterType } from "../libs/interfaces";

type FinancialStatementDtoType = {
  companyId: string;
  name: string;
  year: string;
  stockAmount: number;
  createdAt: Date;
  updatedAt: Date;
  quarterType: QuarterType;
};
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
  public dto(data: FinancialData): FinancialStatementDtoType {
    return {
      companyId: this.financialData.information.code,
      name: this.financialData.information.companyName,
      year: this.year,
      quarterType: this.quarterType,
      stockAmount: this.financialData.stockInfo.stockAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
