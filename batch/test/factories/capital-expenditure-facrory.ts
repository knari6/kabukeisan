import { CapitalExpenditure, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class CapitalExpenditureFactory {
  constructor(private readonly prismaClient: PrismaClient) {}
  public static build(
    overrides: Partial<Prisma.CapitalExpenditureCreateInput>
  ): Prisma.CapitalExpenditureCreateInput {
    const random = new Random();

    return {
      statement: {
        connect: {
          id: random.randomInt(1, 10000),
        },
      },
      depreciation: random.randomInt(1, 100000),
      amortization: random.randomInt(1, 10000),
      depreciationAmortization: random.randomInt(1, 10000),
      capitalExpenditure: random.randomInt(1, 10000),
      researchAndDevelopment: random.randomInt(1, 10000),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.CapitalExpenditureCreateInput>
  ): Promise<CapitalExpenditure> {
    const input = CapitalExpenditureFactory.build(overrides);
    return this.prismaClient.capitalExpenditure.create({
      data: input,
    });
  }
}
