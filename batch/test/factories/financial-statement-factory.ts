import { FinancialStatements, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class FinancialStatementFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.FinancialStatementsCreateInput> = {}
  ): Prisma.FinancialStatementsCreateInput {
    const random = new Random();
    return {
      fiscalYear: random.randomInt(2010, 2025).toString(),
      quarterType: random.randomElement(["Q1", "Q2", "Q3", "Q4", "FY"]),
      stockAmount: random.randomInt(1000000, 100000000),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
      company: {
        connect: {
          id: random.randomInt(1, 1000),
        },
      },
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.FinancialStatementsCreateInput>
  ): Promise<FinancialStatements> {
    const input = FinancialStatementFactory.build(overrides);
    return this.prismaClient.financialStatements.create({
      data: input,
    });
  }
}
