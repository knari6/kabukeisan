import { PrismaClient } from "@prisma/client";

export class ProfitLossStatementRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
}
