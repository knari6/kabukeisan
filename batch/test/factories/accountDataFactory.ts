import { Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class AccountDataFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public build(
    overrides: Partial<Prisma.AccountDatasCreateInput> = {}
  ): Prisma.AccountDatasCreateInput {
    const random = new Random();
    return {
      current_asset: random.randomInt(1000, 10000).toString(),
      cash: random.randomInt(1000, 10000).toString(),
      trade_receivable: random.randomInt(1000, 10000).toString(),
      security: random.randomInt(1000, 10000).toString(),
      inventory: random.randomInt(1000, 10000).toString(),
      other_current_asset: random.randomInt(1000, 10000).toString(),
      non_current_asset: random.randomInt(1000, 10000).toString(),
      tangible_asset: random.randomInt(1000, 10000).toString(),
      long_term_security: random.randomInt(1000, 10000).toString(),
      investment: random.randomInt(1000, 10000).toString(),
      other_asset: random.randomInt(1000, 10000).toString(),
      assets: random.randomInt(1000, 10000).toString(),
      liability: random.randomInt(1000, 10000).toString(),
      current_liability: random.randomInt(1000, 10000).toString(),
      accounts_payable_trade: random.randomInt(1000, 10000).toString(),
      other_current_liability: random.randomInt(1000, 10000).toString(),
      non_current_liability: random.randomInt(1000, 10000).toString(),
      bond: random.randomInt(1000, 10000).toString(),
      long_term_debt: random.randomInt(1000, 10000).toString(),
      equity: random.randomInt(1000, 10000).toString(),
      sale: random.randomInt(1000, 10000).toString(),
      gross_profit: random.randomInt(1000, 10000).toString(),
      operating_income: random.randomInt(1000, 10000).toString(),
      ordinary_income: random.randomInt(1000, 10000).toString(),
      pre_tax_profit: random.randomInt(1000, 10000).toString(),
      profit: random.randomInt(1000, 10000).toString(),
      depreciation_amortization: random.randomInt(1000, 10000).toString(),
      impairment_loss: random.randomInt(1000, 10000).toString(),
      research_and_development: random.randomInt(1000, 10000).toString(),
      operating_activities: random.randomInt(1000, 10000).toString(),
      investment_activities: random.randomInt(1000, 10000).toString(),
      financing_activities: random.randomInt(1000, 10000).toString(),
      dividends_paid: random.randomInt(1000, 10000).toString(),
      capital_expenditures: random.randomInt(1000, 10000).toString(),
      goodwill_amortizaion: random.randomInt(1000, 10000).toString(),
      companies: {
        connect: {
          id: random.randomInt(1, 1000),
        },
      },
      ...overrides,
    };
  }

  public async create() {}
}
