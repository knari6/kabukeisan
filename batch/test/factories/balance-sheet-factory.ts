import { BalanceSheet, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class BalanceSheetFactory {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.BalanceSheetCreateInput>
  ): Prisma.BalanceSheetCreateInput {
    const random = new Random();

    return {
      statement: {
        connect: {
          id: random.randomInt(1, 1000),
        },
      },
      assets: random.randomInt(1000000, 9999999),
      currentAssets: random.randomInt(1000000, 9999999),
      cashAndDeposits: random.randomInt(1000000, 9999999),
      accountsReceivable: random.randomInt(1000000, 9999999),
      merchandiseAndFinishedGoods: random.randomInt(1000000, 9999999),
      securities: random.randomInt(1000000, 9999999),
      inventory: random.randomInt(1000000, 9999999),
      otherCurrentAssets: random.randomInt(1000000, 9999999),
      fixedAssets: random.randomInt(1000000, 9999999),
      tangibleFixedAssets: random.randomInt(1000000, 9999999),
      land: random.randomInt(1000000, 9999999),
      intangibleFixedAssets: random.randomInt(1000000, 9999999),
      investmentSecurities: random.randomInt(1000000, 9999999),
      other: random.randomInt(1000000, 9999999),
      createdAt: random.randomDate(),
      updatedAt: random.randomDate(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.BalanceSheetCreateInput>
  ): Promise<BalanceSheet> {
    const input = BalanceSheetFactory.build(overrides);
    return this.prismaClient.balanceSheet.create({
      data: input,
    });
  }
}
