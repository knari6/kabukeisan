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
    finance = new Finance();
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
        assets: {
          currentAssets: random.randomInt(10000, 100000),
          cashAndDeposits: random.randomInt(1000, 10000),
          accountsReceivable: random.randomInt(1000, 10000),
          merchandiseAndFinishedGoods: random.randomInt(1000, 10000),
          securities: random.randomInt(1000, 10000),
          inventory: random.randomInt(1000, 10000),
          otherCurrentAssets: random.randomInt(1000, 10000),
          fixedAssets: random.randomInt(1000, 10000),
          tangibleFixedAssets: random.randomInt(1000, 10000),
          land: random.randomInt(1000, 10000),
          intangibleFixedAssets: random.randomInt(1000, 10000),
          investmentSecurities: random.randomInt(1000, 10000),
          other: random.randomInt(1000, 10000),
          asset: random.randomInt(1000, 10000),
        },
        liabilities: {
          currentLiabilities: random.randomInt(1000, 10000),
          debt: random.randomInt(1000, 10000),
          otherCurrentLiabilities: random.randomInt(1000, 10000),
          fixedLiabilities: random.randomInt(1000, 10000),
          liability: random.randomInt(1000, 10000),
          other: random.randomInt(1000, 10000),
        },
        netAssets: {
          equity: random.randomInt(1000, 10000),
          total: random.randomInt(1000, 10000),
        },
      },
      incomeStatement: {
        netSales: random.randomInt(1000, 10000),
        costOfSales: random.randomInt(1000, 10000),
        operatingIncome: random.randomInt(1000, 10000),
        ordinaryIncome: random.randomInt(1000, 10000),
        incomeBeforeIncomeTaxes: random.randomInt(1000, 10000),
        tax: random.randomInt(1000, 10000),
        profitLoss: random.randomInt(1000, 10000),
      },
      cashFlowStatement: {
        netCashProvidedByOperatingActivities: random.randomInt(1000, 10000),
        netCashProvidedByInvestingActivities: random.randomInt(1000, 10000),
        netCashProvidedByFinancingActivities: random.randomInt(1000, 10000),
        cashAndCashEquivalents: random.randomInt(1000, 10000),
        dividendsPaid: random.randomInt(1000, 10000),
      },
      capitalAndRDExpenses: {
        depreciation: random.randomInt(1000, 10000),
        amortization: random.randomInt(1000, 10000),
        equipmentInvestment: random.randomInt(1000, 10000),
        researchAndDevelopmentExpenses: random.randomInt(1000, 10000),
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
        financialStatements = finance.extractFinancialStatements(
          xmlData,
          `${random.randomDate().getFullYear()}-${
            random.randomDate().getMonth() + 1
          }-${random.randomDate().getDate()}`
        );
      });
      it("should return financial statements", () => {
        expect(financialStatements).toBeDefined();
      });
    });
    describe("証券コードがない場合", () => {
      beforeEach(async () => {
        xmlData = await parse.xbrl("test/xbrl_without_code");
      });
      it("エラーを返すこと", () => {
        expect(() =>
          finance.extractFinancialStatements(xmlData, "2024-01-01")
        ).toThrow("証券コードがありません");
      });
    });
  });

  describe("ROICの計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.netAssets.equity;
      const debt = mockFinanceStatement.balanceSheet.liabilities.debt;
      const { operatingIncome, tax, incomeBeforeIncomeTaxes } =
        mockFinanceStatement.incomeStatement;
      const expected =
        (operatingIncome * (1 - tax / incomeBeforeIncomeTaxes)) /
        (equity + debt);
      const acutual = finance.calcROIC(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("有利子負債と自己資本の合計が0の時エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.netAssets.equity = 0;
      mockFinanceStatement.balanceSheet.liabilities.debt = 0;
      expect(() => finance.calcROIC(mockFinanceStatement)).toThrow(
        "自己資本と有利子負債の合計が0になったため計算できません"
      );
    });
    it("税引き前利益がマイナスの場合法人税率を30%として計算すること", () => {
      mockFinanceStatement.balanceSheet.netAssets.equity = random.randomInt(
        1000,
        10000
      );
      mockFinanceStatement.balanceSheet.liabilities.debt = random.randomInt(
        1000,
        10000
      );
      mockFinanceStatement.incomeStatement.incomeBeforeIncomeTaxes = -1000;

      const equity = mockFinanceStatement.balanceSheet.netAssets.equity;
      const debt = mockFinanceStatement.balanceSheet.liabilities.debt;
      const { operatingIncome } = mockFinanceStatement.incomeStatement;
      const expected = (operatingIncome * 0.7) / (equity + debt);
      const acutual = finance.calcROIC(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
  });

  describe("ROEの計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.netAssets.equity;
      const expected = mockFinanceStatement.incomeStatement.profitLoss / equity;
      const acutual = finance.calcROE(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("自己資本が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.netAssets.equity = 0;
      expect(() => finance.calcROE(mockFinanceStatement)).toThrow(
        "自己資本が0になったため計算できません"
      );
    });
    it("自己資本がマイナスの場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.netAssets.equity = -1000;
      expect(() => finance.calcROE(mockFinanceStatement)).toThrow(
        "自己資本がマイナスになったため計算できません"
      );
    });
  });

  describe("ROAの計算", () => {
    it("値を返すこと", () => {
      const assets = mockFinanceStatement.balanceSheet.assets.asset;
      const expected = mockFinanceStatement.incomeStatement.profitLoss / assets;
      const acutual = finance.calcROA(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("資産が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.assets.asset = 0;
      expect(() => finance.calcROA(mockFinanceStatement)).toThrow(
        "資産が0になったため計算できません"
      );
    });
    it("資産がマイナスの場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.assets.asset = -1000;
      expect(() => finance.calcROA(mockFinanceStatement)).toThrow(
        "資産がマイナスになったため計算できません"
      );
    });
  });

  describe("自己資本比率の計算", () => {
    it("値を返すこと", () => {
      const equity = mockFinanceStatement.balanceSheet.netAssets.equity;
      const assets = mockFinanceStatement.balanceSheet.assets.asset;
      const expected = equity / assets;
      const acutual = finance.calcEquityRatio(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("資産が0の場合エラーを返すこと", () => {
      mockFinanceStatement.balanceSheet.assets.asset = 0;
      expect(() => finance.calcEquityRatio(mockFinanceStatement)).toThrow(
        "資産が0になったため計算できません"
      );
    });
  });

  describe("粗利益率の計算", () => {
    it("値を返すこと", () => {
      const netSales = mockFinanceStatement.incomeStatement.netSales;
      const costOfSales = mockFinanceStatement.incomeStatement.costOfSales;
      const expected = (netSales - costOfSales) / netSales;
      const acutual = finance.calcGrossProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.netSales = 0;
      expect(() => finance.calcGrossProfitMargin(mockFinanceStatement)).toThrow(
        "売上高が0になったため計算できません"
      );
    });
  });

  describe("営業利益率の計算", () => {
    it("値を返すこと", () => {
      const operatingIncome =
        mockFinanceStatement.incomeStatement.operatingIncome;
      mockFinanceStatement.incomeStatement.netSales = random.randomInt(
        1000,
        10000
      );
      const netSales = mockFinanceStatement.incomeStatement.netSales;
      const expected = operatingIncome / netSales;
      const acutual = finance.calcOperatingProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.netSales = 0;
      expect(() =>
        finance.calcOperatingProfitMargin(mockFinanceStatement)
      ).toThrow("売上高が0になったため計算できません");
    });
  });

  describe("経常利益率の計算", () => {
    it("値を返すこと", () => {
      const ordinaryIncome =
        mockFinanceStatement.incomeStatement.ordinaryIncome;
      mockFinanceStatement.incomeStatement.netSales = random.randomInt(
        1000,
        10000
      );
      const netSales = mockFinanceStatement.incomeStatement.netSales;
      const expected = ordinaryIncome / netSales;
      const acutual = finance.calcOrdinaryProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.netSales = 0;
      expect(() =>
        finance.calcOrdinaryProfitMargin(mockFinanceStatement)
      ).toThrow("売上高が0になったため計算できません");
    });
  });

  describe("当期純利益率の計算", () => {
    it("値を返すこと", () => {
      const profitLoss = mockFinanceStatement.incomeStatement.profitLoss;
      mockFinanceStatement.incomeStatement.netSales = random.randomInt(
        1000,
        10000
      );
      const netSales = mockFinanceStatement.incomeStatement.netSales;
      const expected = profitLoss / netSales;
      const acutual = finance.calcNetProfitMargin(mockFinanceStatement);
      expect(acutual).toBeCloseTo(expected, 4);
    });
    it("売上高が0の場合エラーを返すこと", () => {
      mockFinanceStatement.incomeStatement.netSales = 0;
      expect(() => finance.calcNetProfitMargin(mockFinanceStatement)).toThrow(
        "売上高が0になったため計算できません"
      );
    });
  });

  describe("正味流動資産の計算", () => {
    it("値を返すこと", () => {
      const cash =
        mockFinanceStatement.cashFlowStatement.cashAndCashEquivalents;
      const accountsReceivable =
        mockFinanceStatement.balanceSheet.assets.accountsReceivable;
      const securities = mockFinanceStatement.balanceSheet.assets.securities;
      const land = mockFinanceStatement.balanceSheet.assets.land;
      const investmentSecurities =
        mockFinanceStatement.balanceSheet.assets.investmentSecurities;
      const liabilities =
        mockFinanceStatement.balanceSheet.liabilities.liability;
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
      const depreciation =
        mockFinanceStatement.capitalAndRDExpenses.depreciation;
      const amortization =
        mockFinanceStatement.capitalAndRDExpenses.amortization;
      const expected = depreciation + amortization;
      const acutual = finance.calcNonCashExpenses(mockFinanceStatement);
      expect(acutual).toBe(expected);
    });
  });

  describe("運転資本の増減額の計算", async () => {
    let xmlData: any;
    beforeEach(async () => {});
    it("値を返すこと", async () => {
      xmlData = await parse.xbrl("test/xbrl_finance");
      const currentAssets = extractNumber(
        xmlData,
        "jppfs_cor:CurrentAssets",
        "CurrentYearInstant"
      );
      const currentAssetsOneYearAgo = extractNumber(
        xmlData,
        "jppfs_cor:CurrentAssets",
        "Prior1YearInstant"
      );
      const cash = extractNumber(
        xmlData,
        "jppfs_cor:CashAndDeposits",
        "CurrentYearInstant"
      );
      const cashOneYearAgo = extractNumber(
        xmlData,
        "jppfs_cor:CashAndDeposits",
        "Prior1YearInstant"
      );

      const currentPortionOfLongTermLoansPayable = extractNumber(
        xmlData,
        "jppfs_cor:CurrentPortionOfLongTermLoansPayable",
        "CurrentYearDuration"
      );
      const shortTermLoansPayable = extractNumber(
        xmlData,
        "jppfs_cor:ShortTermLoansPayable",
        "CurrentYearDuration"
      );
      const notesAndAccountsPayableTrade = extractNumber(
        xmlData,
        "jppfs_cor:NotesAndAccountsPayableTrade",
        "CurrentYearDuration"
      );
      const currentPortionOfLongTermLoansPayableOneYearAgo = extractNumber(
        xmlData,
        "jppfs_cor:CurrentPortionOfLongTermLoansPayable",
        "Prior1YearInstant"
      );

      const shortTermLoansPayableOneYearAgo = extractNumber(
        xmlData,
        "jppfs_cor:ShortTermLoansPayable",
        "Prior1YearInstant"
      );

      const notesAndAccountsPayableTradeOneYearAgo = extractNumber(
        xmlData,
        "jppfs_cor:NotesAndAccountsPayableTrade",
        "Prior1YearInstant"
      );

      const currentAssetsWithoutCash = currentAssets - cash;

      const currentAssetsWithoutCashOneYearAgo =
        currentAssetsOneYearAgo - cashOneYearAgo;

      const accountsPayable =
        currentPortionOfLongTermLoansPayable +
        shortTermLoansPayable +
        notesAndAccountsPayableTrade;

      const accountsPayableOneYearAgo =
        currentPortionOfLongTermLoansPayableOneYearAgo +
        shortTermLoansPayableOneYearAgo +
        notesAndAccountsPayableTradeOneYearAgo;
      const expected =
        currentAssetsWithoutCash -
        accountsPayable -
        (currentAssetsWithoutCashOneYearAgo - accountsPayableOneYearAgo);

      const acutual = finance.calcWorkingCapital(xmlData);
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
