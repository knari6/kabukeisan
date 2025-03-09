import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("beforeExit", async () => {
  try {
    await prisma.$transaction([
      prisma.cashFlowStatement.deleteMany(),
      prisma.debtStatements.deleteMany(),
      prisma.profitLossStatements.deleteMany(),
      prisma.financialStatements.deleteMany(),
      prisma.companies.deleteMany(),
    ]);

    // Prismaの接続を閉じる
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
});
