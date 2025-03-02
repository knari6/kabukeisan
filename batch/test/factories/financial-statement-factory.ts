import { FinancialStatements, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class FinancialStatementFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.FinancialStatementsCreateInput> = {}
  ): Prisma.FinancialStatementsCreateInput {
    const random = new Random();
    return {
      fiscalYear: "2023",
      quarterType: "Q1",
      stockAmount: new Prisma.Decimal(1000000),
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        create: {
          name: `テスト会社${random.randomInt(1000, 9999)}`,
          code: random.randomInt(1000, 9999).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
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
