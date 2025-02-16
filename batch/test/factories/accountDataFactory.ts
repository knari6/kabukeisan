import { AccountDatas, Prisma, PrismaClient } from "@prisma/client";
import { Random } from "../../src/libs/random";

export class AccountDataFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public static build(
    overrides: Partial<Prisma.AccountDatasCreateInput> = {}
  ): Prisma.AccountDatasCreateInput {
    const random = new Random();
    const codeValue = random.randomInt(1000, 9999).toString();
    const yearValue = random.randomInt(1950, 2999).toString();

    return {
      quater: random.randomInt(1, 5).toString(),
      current_asset: random.randomInt(1000, 10000).toString(),
      cash: random.randomInt(1000, 10000).toString(),
      trade_receivable: random.randomInt(1000, 10000).toString(),
      securities: random.randomInt(1000, 10000).toString(),
      inventory: random.randomInt(1000, 10000).toString(),
      other_current_asset: random.randomInt(1000, 10000).toString(),
      fixed_asset: random.randomInt(1000, 10000).toString(),
      tangible_asset: random.randomInt(1000, 10000).toString(),
      investment: random.randomInt(1000, 10000).toString(),
      other_asset: random.randomInt(1000, 10000).toString(),
      assets: random.randomInt(1000, 10000).toString(),
      liability: random.randomInt(1000, 10000).toString(),
      current_liability: random.randomInt(1000, 10000).toString(),
      debt: random.randomInt(1000, 10000).toString(),
      other_current_liability: random.randomInt(1000, 10000).toString(),
      fixed_liability: random.randomInt(1000, 10000).toString(),

      equity: random.randomInt(1000, 10000).toString(),
      net_assets: random.randomInt(1000, 10000).toString(),

      sale: random.randomInt(1000, 10000).toString(),
      gross_profit: random.randomInt(1000, 10000).toString(),
      operating_income: random.randomInt(1000, 10000).toString(),
      ordinary_income: random.randomInt(1000, 10000).toString(),
      pre_tax_profit: random.randomInt(1000, 10000).toString(),
      profit: random.randomInt(1000, 10000).toString(),

      depreciation_amortization: random.randomInt(1000, 10000).toString(),
      research_and_development: random.randomInt(1000, 10000).toString(),
      equipment_investment: random.randomInt(1000, 10000).toString(),
      operating_activities: random.randomInt(1000, 10000).toString(),
      investment_activities: random.randomInt(1000, 10000).toString(),
      financing_activities: random.randomInt(1000, 10000).toString(),
      dividends_paid: random.randomInt(1000, 10000).toString(),

      companies: {
        create: {
          code: codeValue,
          year: yearValue,
          name: `Test Company ${codeValue}`,
        },
      },
      created_at: random.randomDate(),
      updated_at: random.randomDate(),
      ...overrides,
    };
  }

  public async create(
    overrides: Partial<Prisma.AccountDatasCreateInput>
  ): Promise<AccountDatas> {
    const input = AccountDataFactory.build(overrides);

    // もし companies が connect で指定されている場合は、
    // 先に Companies レコードが存在することを確認
    if (input.companies?.connect) {
      const company = await this.prismaClient.companies.findFirst({
        where: {
          code: input.companies.connect.code_year?.code,
          year: input.companies.connect.code_year?.year,
        },
      });

      if (!company) {
        throw new Error("Related Companies record not found");
      }
    }

    return this.prismaClient.accountDatas.create({
      data: input,
    });
  }
}
