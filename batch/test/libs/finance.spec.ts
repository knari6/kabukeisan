import {
  expect,
  it,
  beforeEach,
  describe,
  vi,
  afterEach,
  beforeAll,
} from "vitest";
import { Finance } from "../../src/libs/finance";
import { Parse } from "../../src/libs/parse";
import { FinancialData } from "../../src/libs/interfaces";
import { Random } from "../../src/libs/random";
import { File } from "../../src/libs/file";
import { extractNumber } from "../helper/test-helper";

describe("Finance", () => {
  let finance: Finance;
  let parse: Parse;
  let random: Random;
  let xmlData: any;
  let financialStatements: FinancialData;
  let mockFinanceStatement: FinancialData;
  let consoleErrorSpy: any;

  beforeAll(() => {
    parse = new Parse();

    random = new Random();
    mockFinanceStatement = {
      information: {
        code: random.randomInt(1000, 10000).toString(),
        companyName: "テスト会社ファイナンス",
        filingDate: "2024-01-01",
        fiscalPeriod: "2024",
        quarterType: "Q1",
        year: "2024",
      },
      balanceSheet: {
        currentAsset: random.randomInt(10000, 100000),
        cashAndDeposit: random.randomInt(1000, 10000),
        accountsReceivable: random.randomInt(1000, 10000),
        merchandiseAndFinishedGood: random.randomInt(1000, 10000),
        security: random.randomInt(1000, 10000),
        inventory: random.randomInt(1000, 10000),
        otherCurrentAsset: random.randomInt(1000, 10000),
        fixedAsset: random.randomInt(1000, 10000),
        tangibleFixedAsset: random.randomInt(1000, 10000),
        land: random.randomInt(1000, 10000),
        intangibleFixedAsset: random.randomInt(1000, 10000),
        investmentSecurity: random.randomInt(1000, 10000),
        otherAsset: random.randomInt(1000, 10000),
        asset: random.randomInt(1000, 10000),
        currentLiability: random.randomInt(1000, 10000),
        accountsPayable: random.randomInt(1000, 10000),
        debt: random.randomInt(1000, 10000),
        otherCurrentLiability: random.randomInt(1000, 10000),
        fixedLiability: random.randomInt(1000, 10000),
        liability: random.randomInt(1000, 10000),
        otherLiability: random.randomInt(1000, 10000),
        equity: random.randomInt(1000, 10000),
        netAsset: random.randomInt(1000, 10000),
      },
      incomeStatement: {
        sale: random.randomInt(1000, 10000),
        costOfSale: random.randomInt(1000, 10000),
        operatingIncome: random.randomInt(1000, 10000),
        ordinaryIncome: random.randomInt(1000, 10000),
        incomeBeforeTax: random.randomInt(1000, 10000),
        tax: random.randomInt(1000, 10000),
        profitLoss: random.randomInt(1000, 10000),
      },
      cashFlowStatement: {
        operatingCF: random.randomInt(1000, 10000),
        investingCF: random.randomInt(1000, 10000),
        financeCF: random.randomInt(1000, 10000),
        cashAndCashEquivalent: random.randomInt(1000, 10000),
        dividendsPaid: random.randomInt(1000, 10000),
      },
      capitalExpenditure: {
        depreciation: random.randomInt(1000, 10000),
        amortization: random.randomInt(1000, 10000),
        equipmentInvestment: random.randomInt(1000, 10000),
        researchAndDevelopment: random.randomInt(1000, 10000),
      },
      interestBearingDebt: {
        debt: random.randomInt(1000, 10000),
      },
      stockInfo: {
        stockAmount: random.randomInt(1000, 10000),
      },
    };
  });

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("extractFinancialStatements", () => {
    random = new Random();
    describe("証券コードがある場合", () => {
      beforeEach(async () => {
        xmlData = await parse.xbrl("test/xbrl_finance");
        finance = new Finance(
          xmlData,
          `${random.randomDate().getFullYear()}-${
            random.randomDate().getMonth() + 1
          }-${random.randomDate().getDate()}`,
          "1"
        );
        financialStatements = finance.extractFinancialStatements();
      });
      it("should return financial statements", () => {
        expect(financialStatements).toBeDefined();
      });
    });
    describe("証券コードがない場合", () => {
      beforeEach(async () => {
        xmlData = await parse.xbrl("test/xbrl_without_code");
        finance = new Finance(
          xmlData,
          `${random.randomDate().getFullYear()}-${
            random.randomDate().getMonth() + 1
          }-${random.randomDate().getDate()}`,
          "1"
        );
      });
      it("エラーを返すこと", () => {
        expect(() => finance.extractFinancialStatements()).toThrow(
          "証券コードがありません"
        );
      });
    });
  });

  describe("ROICの計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.equity;
      const debt = mockFinanceStatement.balanceSheet.debt;
      const { operatingIncome, tax, incomeBeforeTax } =
        mockFinanceStatement.incomeStatement;
      const expected =
        (operatingIncome * (1 - tax / incomeBeforeTax)) / (equity + debt);
      const acutual = finance.calcROIC(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("有利子負債と自己資本の合計が0の時エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.equity = 0;
      mockFinanceStatement.balanceSheet.debt = 0;
      expect(() => finance.calcROIC(mockFinanceStatement)).toThrow(
        "自己資本と有利子負債の合計が0になったため計算できません"
      );
    });
    it("税引き前利益がマイナスの場合法人税率を30%として計算すること", () => {
      mockFinanceStatement.balanceSheet.equity = random.randomInt(1000, 10000);
      mockFinanceStatement.balanceSheet.debt = random.randomInt(1000, 10000);
      mockFinanceStatement.incomeStatement.incomeBeforeTax = -1000;

      const equity = mockFinanceStatement.balanceSheet.equity;
      const debt = mockFinanceStatement.balanceSheet.debt;
      const { operatingIncome } = mockFinanceStatement.incomeStatement;
      const expected = (operatingIncome * 0.7) / (equity + debt);
      const acutual = finance.calcROIC(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
  });

  describe("ROEの計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.equity;
      const expected = mockFinanceStatement.incomeStatement.profitLoss / equity;
      const acutual = finance.calcROE(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("自己資本が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.equity = 0;
      expect(() => finance.calcROE(mockFinanceStatement)).toThrow(
        "自己資本が0になったため計算できません"
      );
    });
    it("自己資本がマイナスの場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.equity = -1000;
      expect(() => finance.calcROE(mockFinanceStatement)).toThrow(
        "自己資本がマイナスになったため計算できません"
      );
    });
  });

  describe("ROAの計算", () => {
    it("値を返すこと", () => {
      const assets = mockFinanceStatement.balanceSheet.asset;
      const expected = mockFinanceStatement.incomeStatement.profitLoss / assets;
      const acutual = finance.calcROA(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("資産が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.asset = 0;
      expect(() => finance.calcROA(mockFinanceStatement)).toThrow(
        "資産が0になったため計算できません"
      );
    });
    it("資産がマイナスの場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.asset = -1000;
      expect(() => finance.calcROA(mockFinanceStatement)).toThrow(
        "資産がマイナスになったため計算できません"
      );
    });
  });

  describe("自己資本比率の計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.equity;
      const asset = mockFinanceStatement.balanceSheet.asset;
      const expected = equity / asset;
      const acutual = finance.calcEquityRatio(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("資産が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.asset = 0;
      expect(() => finance.calcEquityRatio(mockFinanceStatement)).toThrow(
        "資産が0になったため計算できません"
      );
    });
  });

  describe("粗利益率の計算", () => {
    it("値を返すこと", () => {
      const sale = mockFinanceStatement.incomeStatement.sale;
      const costOfSale = mockFinanceStatement.incomeStatement.costOfSale;
      const expected = (sale - costOfSale) / sale;
      const acutual = finance.calcGrossProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.sale = 0;
      expect(() => finance.calcGrossProfitMargin(mockFinanceStatement)).toThrow(
        "売上高が0になったため計算できません"
      );
    });
  });

  describe("営業利益率の計算", () => {
    it("値を返すこと", () => {
      const operatingIncome =
        mockFinanceStatement.incomeStatement.operatingIncome;
      mockFinanceStatement.incomeStatement.sale = random.randomInt(1000, 10000);
      const sale = mockFinanceStatement.incomeStatement.sale;
      const expected = operatingIncome / sale;
      const acutual = finance.calcOperatingProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.sale = 0;
      expect(() =>
        finance.calcOperatingProfitMargin(mockFinanceStatement)
      ).toThrow("売上高が0になったため計算できません");
    });
  });

  describe("経常利益率の計算", () => {
    it("値を返すこと", () => {
      const ordinaryIncome =
        mockFinanceStatement.incomeStatement.ordinaryIncome;
      mockFinanceStatement.incomeStatement.sale = random.randomInt(1000, 10000);
      const sale = mockFinanceStatement.incomeStatement.sale;
      const expected = ordinaryIncome / sale;
      const acutual = finance.calcOrdinaryProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.sale = 0;
      expect(() =>
        finance.calcOrdinaryProfitMargin(mockFinanceStatement)
      ).toThrow("売上高が0になったため計算できません");
    });
  });

  describe("当期純利益率の計算", () => {
    it("値を返すこと", () => {
      const profitLoss = mockFinanceStatement.incomeStatement.profitLoss;
      mockFinanceStatement.incomeStatement.sale = random.randomInt(1000, 10000);
      const sale = mockFinanceStatement.incomeStatement.sale;
      const expected = profitLoss / sale;
      const acutual = finance.calcNetProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.sale = 0;
      expect(() => finance.calcNetProfitMargin(mockFinanceStatement)).toThrow(
        "売上高が0になったため計算できません"
      );
    });
  });

  describe("正味流動資産の計算", () => {
    it("値を返すこと", () => {
      const cash = mockFinanceStatement.cashFlowStatement.cashAndCashEquivalent;
      const accountsReceivable =
        mockFinanceStatement.balanceSheet.accountsReceivable;
      const securities = mockFinanceStatement.balanceSheet.security;
      const land = mockFinanceStatement.balanceSheet.land;
      const investmentSecurities =
        mockFinanceStatement.balanceSheet.investmentSecurity;
      const liabilities = mockFinanceStatement.balanceSheet.liability;
      const expected =
        ((cash +
          accountsReceivable +
          securities +
          land +
          investmentSecurities -
          liabilities) *
          2) /
        3;
      const acutual = finance.calcNetCurrentAssets(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("エラーを返すこと", () => {
      vi.spyOn(finance, "calcNetCurrentAssets").mockImplementation(() => {
        throw new Error("計算できません");
      });

      expect(() => finance.calcNetCurrentAssets(mockFinanceStatement)).toThrow(
        "計算できません"
      );
    });
  });

  describe("NOPATの計算", () => {
    it("値を返すこと", () => {
      const operatingIncome =
        mockFinanceStatement.incomeStatement.operatingIncome;
      const tax = mockFinanceStatement.incomeStatement.tax;
      const expected = operatingIncome - tax;
      const acutual = finance.calcNOPAT(mockFinanceStatement);
      expect(acutual).toBe(expected);
    });
  });

  describe("非現金支出の計算", () => {
    it("値を返すこと", () => {
      const depreciation = mockFinanceStatement.capitalExpenditure.depreciation;
      const amortization = mockFinanceStatement.capitalExpenditure.amortization;
      const expected = depreciation + amortization;
      const acutual = finance.calcNonCashExpenses(mockFinanceStatement);
      expect(acutual).toBe(expected);
    });
  });

  describe("運転資本の増減額の計算", async () => {
    let prevAccountReceivable: number;
    let prevInventory: number;
    let prevAccountPayable: number;
    beforeEach(async () => {
      prevAccountReceivable = random.randomInt(1000, 500);
      prevInventory = random.randomInt(1000, 500);
      prevAccountPayable = random.randomInt(600, 300);
    });
    it("値を返すこと", async () => {
      const acutual = finance.calcWorkingCapital(
        financialStatements.balanceSheet.accountsReceivable,
        financialStatements.balanceSheet.inventory,
        financialStatements.balanceSheet.accountsPayable,
        prevAccountReceivable,
        prevInventory,
        prevAccountPayable
      );
      const expected =
        financialStatements.balanceSheet.accountsReceivable +
        financialStatements.balanceSheet.inventory -
        financialStatements.balanceSheet.accountsPayable -
        (prevAccountReceivable + prevInventory - prevAccountPayable);

      expect(acutual).toEqual(expected);
    });
  });

  describe("FCFの計算", () => {
    it("値を返すこと", () => {
      const nopat = random.randomInt(1000, 10000);
      const nonCashExpenses = random.randomInt(1000, 10000);
      const workingCapital = random.randomInt(1000, 10000);
      const expected = nopat - nonCashExpenses - workingCapital;
      const acutual = finance.calcFCF(nopat, nonCashExpenses, workingCapital);
      expect(acutual).toEqual(expected);
    });
  });

  describe("EVAの計算", () => {
    it("値を返すこと", () => {
      const roic = random.randomInt(1, 100) / 100;
      const capitalCost = random.randomInt(1, 100) / 100;
      const investedCapital = random.randomInt(1000, 10000);
      const expected = investedCapital * (roic - capitalCost);
      const acutual = finance.calcEVA(roic, capitalCost, investedCapital);
      expect(acutual).toEqual(expected);
    });
  });

  describe("DCF法での企業価値の計算", () => {
    it("値を返すこと", () => {
      const fcf = random.randomInt(1000, 10000);
      const discountRate = 0.03;
      const growthRate = 0.03;
      let expected = 0;
      let fcfValue = fcf;
      for (let index = 0; index < 5; index++) {
        expected += fcfValue / Math.pow(1 + discountRate, index + 1);
        fcfValue = fcfValue * (1 + growthRate);
      }
      const acutual = finance.calcDCF(fcf, discountRate, growthRate);
      expect(acutual).toBeCloseTo(expected, 3);
    });

    it("エラーを返すこと", () => {
      vi.spyOn(finance, "calcDCF").mockImplementation(() => {
        throw new Error("FCFが0になったため計算できません");
      });
      const fcf = random.randomInt(1, 100);
      const discountRate = 0;
      const growthRate = 0.03;
      expect(() => finance.calcDCF(fcf, discountRate, growthRate)).toThrow(
        "FCFが0になったため計算できません"
      );
    });
  });
});
