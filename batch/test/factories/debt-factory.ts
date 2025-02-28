import { DebtStatements, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class DebtFactory {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.DebtStatementsCreateInput>
  ): Prisma.DebtStatementsCreateInput {
    const random = new Random();
    return {
      statement: {
        connect: {
          id: random.randomInt(1, 1000),
        },
      },
      interestBearingDebt: random.randomInt(1, 1000),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.DebtStatementsCreateInput>
  ): Promise<DebtStatements> {
    const input = DebtFactory.build(overrides);
    return this.prismaClient.debtStatements.create({
      data: input,
    });
  }
}
