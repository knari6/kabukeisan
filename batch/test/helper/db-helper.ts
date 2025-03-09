import { PrismaService } from "../../src/services/prisma.service";

export type TableName =
  | "profitLossStatements"
  | "balanceSheet"
  | "cashFlowStatement"
  | "capitalExpenditure"
  | "debtStatements";
export class DBHelper {
  public constructor(private readonly prisma: PrismaService) {}
  public async cleanUp(tableName?: TableName) {
    await this.prisma.$transaction(async (tx) => {
      switch (tableName) {
        case "profitLossStatements":
          await tx.profitLossStatements.deleteMany().then(async () => {
            await tx.financialStatements.deleteMany().then(async () => {
              await tx.companies.deleteMany();
            });
          });
          break;
        case "balanceSheet":
          await tx.balanceSheet.deleteMany().then(async () => {
            await tx.financialStatements.deleteMany().then(async () => {
              await tx.companies.deleteMany();
            });
          });
          break;
        case "cashFlowStatement":
          await tx.cashFlowStatement.deleteMany().then(async () => {
            await tx.financialStatements.deleteMany().then(async () => {
              await tx.companies.deleteMany();
            });
          });
          break;
        case "capitalExpenditure":
          await tx.capitalExpenditure.deleteMany().then(async () => {
            await tx.financialStatements.deleteMany().then(async () => {
              await tx.companies.deleteMany();
            });
          });
          break;
        case "debtStatements":
          await tx.debtStatements.deleteMany().then(async () => {
            await tx.financialStatements.deleteMany().then(async () => {
              await tx.companies.deleteMany();
            });
          });
          break;
        default:
          await tx.profitLossStatements.deleteMany();
          await tx.balanceSheet.deleteMany();
          await tx.cashFlowStatement.deleteMany();
          await tx.capitalExpenditure.deleteMany();
          await tx.debtStatements.deleteMany();
          await tx.companies.deleteMany();
          await tx.financialStatements.deleteMany();
          break;
      }
    });
  }
}
