import { PrismaClient } from "@prisma/client";

export class DepriciationRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
}
