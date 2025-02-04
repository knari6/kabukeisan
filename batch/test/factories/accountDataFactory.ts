import { Prisma, PrismaClient } from "@prisma/client";

export class AccountDataFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public build(overrides: Partial<Prisma.AccountDatasCreateInput>) {}

  public async create() {}
}
