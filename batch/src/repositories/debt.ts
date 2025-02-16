import { PrismaClient } from "@prisma/client";

export class DebtRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
}
