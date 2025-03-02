import { PrismaService } from "../../src/services/prisma.service";

export class DBHelper {
  public constructor(private readonly prisma: PrismaService) {}
  public async cleanUp() {
    await this.prisma.$transaction(async (tx) => {
      await tx.profitLossStatements.deleteMany();
      await tx.balanceSheet.deleteMany();
      await tx.cashFlowStatement.deleteMany();
      await tx.capitalExpenditure.deleteMany();
      await tx.debtStatements.deleteMany();
      await tx.financialStatements.deleteMany();
      await tx.companies.deleteMany();
    });
  }
}
