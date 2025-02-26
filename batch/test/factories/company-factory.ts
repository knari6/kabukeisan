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
      year: random.randomInt(2000, 2023).toString(),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
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
