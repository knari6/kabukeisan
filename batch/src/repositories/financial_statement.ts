import { PrismaClient } from "@prisma/client";

export class FinancialStatementRpository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
}
