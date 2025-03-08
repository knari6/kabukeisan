import { PrismaService } from "../../src/services/prisma.service";

export type TableName =
  | "profitLossStatements"
  | "balanceSheet"
  | "cashFlowStatement"
  | "capitalExpenditure"
  | "debtStatements";
export class DBHelper {
  public constructor(private readonly prisma: PrismaService) {}
  public async cleanUp(tableName: TableName) {
    await this.prisma.$transaction(async (tx) => {
      switch (tableName) {
        case "profitLossStatements":
          await tx.profitLossStatements.deleteMany();
          break;
        case "balanceSheet":
          await tx.balanceSheet.deleteMany();
          break;
        case "cashFlowStatement":
          await tx.cashFlowStatement.deleteMany();
          break;
        case "capitalExpenditure":
          await tx.capitalExpenditure.deleteMany();
          break;
        case "debtStatements":
          await tx.debtStatements.deleteMany();
          break;
        default:
          break;
      }
      await tx.financialStatements.deleteMany();
      await tx.companies.deleteMany();
    });
  }
}
