import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { AccountDataFactory } from "./accountDataFactory";
import { DBHelper } from "../helper/db-helper";
import { AccountDatas, Prisma } from "@prisma/client";
import { CompanyFactory } from "./companyFactory";

describe("AccountDataFactory", () => {
  const prismaService = new PrismaService();
  const factory = new AccountDataFactory(prismaService);
  const companyFactory = new CompanyFactory(prismaService);

  afterAll(async () => {
    await prismaService.onModuleDestroy();
  });

  beforeEach(async () => {
    await new DBHelper(prismaService).cleanUp();
  });
  afterAll(async () => {
    await new DBHelper(prismaService).cleanUp();
  });

  describe("create", () => {
    describe("パラメータがあるとき", () => {
      let parameter: Prisma.AccountDatasCreateInput;
      let accountData: AccountDatas | null;

      beforeEach(async () => {
        parameter = AccountDataFactory.build();
        const created = await factory.create(parameter);
        accountData = await prismaService.accountDatas.findFirst({
          where: { id: created.id },
          include: { companies: true },
        });
        console.log(parameter);
      });

      it("登録できること", () => {
        expect(accountData).not.toBeNull();
        expect(accountData?.assets).toBe(parameter.assets);
        expect(accountData?.current_asset).toBe(parameter.current_asset);
        expect(accountData?.cash).toBe(parameter.cash);
        expect(accountData?.trade_receivable).toBe(parameter.trade_receivable);

        expect(accountData?.inventory).toBe(parameter.inventory);
        expect(accountData?.other_current_asset).toBe(
          parameter.other_current_asset
        );
        expect(accountData?.fixed_asset).toBe(parameter.fixed_asset);
        expect(accountData?.tangible_asset).toBe(parameter.tangible_asset);
        expect(accountData?.investment).toBe(parameter.investment);
        expect(accountData?.other_asset).toBe(parameter.other_asset);
        expect(accountData?.liability).toBe(parameter.liability);
        expect(accountData?.current_liability).toBe(
          parameter.current_liability
        );
        expect(accountData?.other_current_liability).toBe(
          parameter.other_current_liability
        );

        expect(accountData?.equity).toBe(parameter.equity);
        expect(accountData?.sale).toBe(parameter.sale);
        expect(accountData?.gross_profit).toBe(parameter.gross_profit);
        expect(accountData?.operating_income).toBe(parameter.operating_income);
        expect(accountData?.ordinary_income).toBe(parameter.ordinary_income);
        expect(accountData?.pre_tax_profit).toBe(parameter.pre_tax_profit);
        expect(accountData?.profit).toBe(parameter.profit);
        expect(accountData?.depreciation_amortization).toBe(
          parameter.depreciation_amortization
        );

        expect(accountData?.research_and_development).toBe(
          parameter.research_and_development
        );
        expect(accountData?.operating_activities).toBe(
          parameter.operating_activities
        );
        expect(accountData?.investment_activities).toBe(
          parameter.investment_activities
        );
        expect(accountData?.financing_activities).toBe(
          parameter.financing_activities
        );
        expect(accountData?.dividends_paid).toBe(parameter.dividends_paid);
      });
    });
    describe("パラメータがないとき", () => {
      it("登録できること", () => {});
    });
  });
});
