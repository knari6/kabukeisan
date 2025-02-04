import { Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";
import { randomUUID } from "crypto";

export class CompanyFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public build(
    overrides: Partial<Prisma.CompaniesCreateInput>
  ): Prisma.CompaniesCreateInput {
    const random = new Random();
    return {
      code: random.randomInt(1000, 9999).toString(),
      name: randomUUID(),
      year: random.randomInt(1950, 2999).toString(),
      account_datas: {},
    };
  }
}
