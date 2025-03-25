import { FinancialData } from "../../src/libs/interfaces";
import { Random } from "../../src/libs/random";

const random = new Random();
export const financialTestData: FinancialData = {
  information: {
    code: random.randomInt(1000, 9999).toString(),
    companyName: random.randomInt(1000000, 9999999).toString(),
    filingDate: random.randomInt(1000000, 9999999).toString(),
    fiscalPeriod: random.randomInt(1000000, 9999999).toString(),
    quarterType: random.randomQuarterType(),
    year: random.randomInt(2000, 2025).toString(),
  },
  balanceSheet: {
    assets: {
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
      asset: random.randomInt(1000000, 9999999),
    },
    liabilities: {
      currentLiabilities: random.randomInt(1000000, 9999999),
      accountsPayable: random.randomInt(1000000, 9999999),
      debt: random.randomInt(1000000, 9999999),
      otherCurrentLiabilities: random.randomInt(1000000, 9999999),
      fixedLiabilities: random.randomInt(1000000, 9999999),
      other: random.randomInt(1000000, 9999999),
      liability: random.randomInt(1000000, 9999999),
    },
    netAssets: {
      total: random.randomInt(1000000, 9999999),
      equity: random.randomInt(1000000, 9999999),
    },
  },
  incomeStatement: {
    sale: random.randomInt(1000000, 9999999),
    costOfSale: random.randomInt(1000000, 9999999),
    operatingIncome: random.randomInt(1000000, 9999999),
    ordinaryIncome: random.randomInt(1000000, 9999999),
    incomeBeforeTax: random.randomInt(1000000, 9999999),
    tax: random.randomInt(1000000, 9999999),
    profitLoss: random.randomInt(1000000, 9999999),
  },
  cashFlowStatement: {
    operatingCF: random.randomInt(1000000, 9999999),
    investingCF: random.randomInt(1000000, 9999999),
    financeCF: random.randomInt(1000000, 9999999),
    cashAndCashEquivalent: random.randomInt(1000000, 9999999),
    dividendsPaid: random.randomInt(1000000, 9999999),
  },
  capitalExpenditure: {
    depreciation: random.randomInt(1000000, 9999999),
    amortization: random.randomInt(1000000, 9999999),
    equipmentInvestment: random.randomInt(1000000, 9999999),
    researchAndDevelopment: random.randomInt(1000000, 9999999),
  },
  interestBearingDebt: {
    debt: random.randomInt(100000, 99999),
  },
  stockInfo: {
    stockAmount: random.randomInt(1000000, 9999999),
  },
};
