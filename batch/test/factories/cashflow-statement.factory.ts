import { PrismaClient, Prisma, CashFlowStatement } from "@prisma/client";

import { Random } from "../../src/libs/random";
export class CashflowStatementFactory {
  constructor(private readonly prismaClient: PrismaClient) {}
  public static build(
    overrides: Partial<Prisma.CashFlowStatementCreateInput>
  ): Prisma.CashFlowStatementCreateInput {
    const random = new Random();

    return {
      statement: {
        connect: {
          id: random.randomInt(1, 10000),
        },
      },
      operatingCashFlow: random.randomInt(1, 10000),
      investingCashFlow: random.randomInt(1, 10000),
      financingCashFlow: random.randomInt(1, 10000),
      cashAndCashEquivalents: random.randomInt(1, 10000),
      devidendPaid: random.randomInt(1, 10000),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.CashFlowStatementCreateInput>
  ): Promise<CashFlowStatement> {
    const input = CashflowStatementFactory.build(overrides);
    return this.prismaClient.cashFlowStatement.create({
      data: input,
    });
  }
}
