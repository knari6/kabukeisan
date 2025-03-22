import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("beforeExit", async () => {
  try {
    await prisma.$transaction([
      prisma.cashFlow.deleteMany(),
      prisma.debt.deleteMany(),
      prisma.profitLoss.deleteMany(),
      prisma.capitalExpenditure.deleteMany(),
      prisma.companies.deleteMany(),
    ]);

    // Prismaの接続を閉じる
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
});
