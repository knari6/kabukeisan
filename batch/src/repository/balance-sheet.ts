import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { BalanceSheetDto } from "../dto/balance-sheet";

export class BalanceSheetRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }
  public async write() {
    const balanceSheetDto = new BalanceSheetDto(this.data);
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
    const balanceSheet = balanceSheetDto.dto(statement.id);
    try {
      await this.prismaClient.balanceSheet.create({
        data: balanceSheet,
      });
    } catch (error) {
      throw {
        code: this.data.information.code,
        error: error,
      };
    }
  }
}
