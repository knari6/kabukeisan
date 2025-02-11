import { Companies, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";
import { randomUUID } from "crypto";

export class CompanyFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.CompaniesCreateInput> = {}
  ): Prisma.CompaniesCreateInput {
    const random = new Random();
    return {
      code: random.randomInt(1000, 9999).toString(),
      name: randomUUID(),
      // 2999年超えることを想定していないため
      year: random.randomInt(1950, 2999).toString(),
      created_at: random.randomDate(),
      updated_at: random.randomDate(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.CompaniesCreateInput>
  ): Promise<Companies> {
    const input = CompanyFactory.build(overrides);
    return this.prismaClient.companies.create({
      data: input,
    });
  }
}
