import { PrismaClient, ProfitLossStatements } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Random } from "../../src/libs/random";
export class ProfitStatementFactory {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.ProfitLossStatementsCreateInput>
  ): Prisma.ProfitLossStatementsCreateInput {
    const random = new Random();
    return {
      sales: random.randomInt(1, 1000000),
      grossProfit: random.randomInt(1, 1000000),
      operatingProfit: random.randomInt(1, 1000000),
      ordinaryProfit: random.randomInt(1, 1000000),
      profitBeforeTax: random.randomInt(1, 1000000),
      tax: random.randomInt(1, 1000000),
      netProfit: random.randomInt(1, 1000000),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
      statement: {
        connect: {
          id: random.randomInt(1, 1000000),
        },
      },
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.ProfitLossStatementsCreateInput>
  ): Promise<ProfitLossStatements> {
    const input = ProfitStatementFactory.build(overrides);
    return this.prismaClient.profitLossStatements.create({
      data: input,
    });
  }
}
