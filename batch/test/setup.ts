import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("beforeExit", async () => {
  try {
    await prisma.$transaction([
      prisma.cashFlowStatements.deleteMany(),
      prisma.debtStatements.deleteMany(),
      prisma.profitLossStatements.deleteMany(),
      prisma.capitalExpenditures.deleteMany(),
      prisma.financialStatements.deleteMany(),
      prisma.companies.deleteMany(),
    ]);

    // Prismaの接続を閉じる
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
});
