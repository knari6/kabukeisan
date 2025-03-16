import { File } from "./file";
import { FinancialData, QuarterType } from "./interfaces";

export class Finance {
  constructor() {}
  /**
   * xbrlファイルから財務諸表を抽出する
   * @param xmlData
   * @returns FinancialData
   */
  public extractFinancialStatements(
    xmlData: any,
    fiscalYear: string,
    docID: string
  ): FinancialData {
    const context = "CurrentYearInstant_NonConsolidatedMember";
    const durationContext = "CurrentYearDuration_NonConsolidatedMember";
    const informationContext = "FilingDateInstant";
    const code = this.extractValue(
      xmlData,
      "jpdei_cor:SecurityCodeDEI",
      informationContext
    );
    const file = new File();
    if (!code) {
      file.deleteFile(docID);
      throw "証券コードがありません";
    }
    return {
      information: {
        /** 証券コード */
        code: code.substring(0, 4),
        year: fiscalYear.substring(0, 4),
        /** ファンド名 */
        companyName: this.extractValue(
          xmlData,
          "jpdei_cor:FilerNameInJapaneseDEI",
          informationContext
        ),
        /** 提出日 */
        filingDate: this.extractValue(
          xmlData,
          "jpcrp_cor:FilingDateCoverPage",
          informationContext
        ),
        /** 会計期間 */
        fiscalPeriod: fiscalYear.substring(0, 4),
        /** 四半期 */
        quarterType: this.getQuarterType(
          this.extractValue(xmlData, "jppfs_cor:Quarter", informationContext)
        ),
      },
      balanceSheet: {
        /** 資産 */
        assets: {
          /** 流動資産 */
          currentAssets: this.extractNumber(
            xmlData,
            "jppfs_cor:CurrentAssets",
            context
          ),
          /** 現金預金 */
          cashAndDeposits: this.extractNumber(
            xmlData,
            "jppfs_cor:CashAndDeposits",
            context
          ),
          /** 売上債権 */
          accountsReceivable: this.extractNumber(
            xmlData,
            "jppfs_cor:AccountsReceivableTrade",
            context
          ),
          /** 製品 */
          merchandiseAndFinishedGoods: this.extractNumber(
            xmlData,
            "jppfs_cor:MerchandiseAndFinishedGoods",
            context
          ),
          /** 有価証券 */
          securities: this.extractNumber(
            xmlData,
            "jppfs_cor:Securities",
            context
          ),
          /** 棚卸資産 */
          inventory: this.extractNumber(
            xmlData,
            "jppfs_cor:Inventory",
            context
          ),
          /** その他 */
          otherCurrentAssets: this.extractNumber(
            xmlData,
            "jppfs_cor:OtherCA",
            context
          ),

          /** 固定資産 */
          fixedAssets: this.extractNumber(
            xmlData,
            "jppfs_cor:NoncurrentAssets",
            context
          ),
          /** 有形固定資産 */
          tangibleFixedAssets: this.extractNumber(
            xmlData,
            "jppfs_cor:PropertyPlantAndEquipment",
            context
          ),
          /** 土地 */
          land: this.extractNumber(xmlData, "jppfs_cor:Land", context),
          /** 無形固定資産 */
          intangibleFixedAssets: this.extractNumber(
            xmlData,
            "jppfs_cor:IntangibleAssets",
            context
          ),
          /** 投資その他有価証券 */
          investmentSecurities: this.extractNumber(
            xmlData,
            "jppfs_cor:InvestmentsAndOtherAssets",
            "CurrentYearInstant"
          ),

          /** その他 */
          other: this.extractNumber(xmlData, "jppfs_cor:OtherAssets", context),
          /** 資産合計 */
          asset: this.extractNumber(xmlData, "jppfs_cor:Assets", context),
        },
        /** 負債 */
        liabilities: {
          /** 流動負債合計 */
          currentLiabilities: this.extractNumber(
            xmlData,
            "jppfs_cor:CurrentLiabilities",
            context
          ),
          /** 買入債務 */
          accountsPayable: this.extractNumber(
            xmlData,
            "jppfs_cor:AccountsPayableOperatingSpecific",
            context
          ),

          /** 債務 */
          debt: this.extractNumber(
            xmlData,
            "jppfs_cor:ShortTermLoansPayable",
            context
          ),

          /** その他 */
          otherCurrentLiabilities: this.extractNumber(
            xmlData,
            "jppfs_cor:OtherCL",
            context
          ),

          /** 固定負債 */
          fixedLiabilities: this.extractNumber(
            xmlData,
            "jppfs_cor:FixedLiabilities",
            context
          ),
          /** その他 */
          other: this.extractNumber(
            xmlData,
            "jppfs_cor:OtherLiabilities",
            context
          ),
          /** 負債合計 */
          liability: this.extractNumber(
            xmlData,
            "jppfs_cor:Liabilities",
            context
          ),
        },
        netAssets: {
          /** 純資産合計 */
          total: this.extractNumber(xmlData, "jppfs_cor:NetAssets", context),
          /** 純資産 */
          equity: this.extractNumber(
            xmlData,
            "jppfs_cor:ShareholdersEquity",
            context
          ),
        },
      },
      incomeStatement: {
        /** 売上高 */
        sales: this.extractNumber(
          xmlData,
          "jppfs_cor:NetSales",
          durationContext
        ),
        /** 売上原価 */
        costOfSales: this.extractNumber(
          xmlData,
          "jppfs_cor:CostOfSales",
          durationContext
        ),
        /** 営業利益 */
        operatingIncome: this.extractNumber(
          xmlData,
          "jppfs_cor:OperatingIncome",
          durationContext
        ),
        /** 経常利益 */
        ordinaryIncome: this.extractNumber(
          xmlData,
          "jppfs_cor:OrdinaryIncome",
          durationContext
        ),
        /** 税引前利益 */
        incomeBeforeIncomeTaxes: this.extractNumber(
          xmlData,
          "jppfs_cor:IncomeBeforeIncomeTaxes",
          durationContext
        ),
        /** 法人税等合計 */
        tax: this.extractNumber(
          xmlData,
          "jppfs_cor:IncomeTaxes",
          durationContext
        ),
        /** 当期純利益 */
        profitLoss: this.extractNumber(
          xmlData,
          "jppfs_cor:ProfitLoss",
          durationContext
        ),
      },
      cashFlowStatement: {
        /** 営業キャッシュフロー */
        netCashProvidedByOperatingActivities: this.extractNumber(
          xmlData,
          "jppfs_cor:NetCashProvidedByUsedInOperatingActivities",
          "CurrentYearDuration"
        ),
        /** 投資キャッシュフロー */
        netCashProvidedByInvestingActivities: this.extractNumber(
          xmlData,
          "jppfs_cor:NetCashProvidedByUsedInInvestmentActivities",
          "CurrentYearDuration"
        ),
        /** 財務キャッシュフロー */
        netCashProvidedByFinancingActivities: this.extractNumber(
          xmlData,
          "jppfs_cor:NetCashProvidedByUsedInFinancingActivities",
          "CurrentYearDuration"
        ),
        /** 現金及び現金同等物 */
        cashAndCashEquivalents: this.extractNumber(
          xmlData,
          "jppfs_cor:CashAndCashEquivalents",
          "CurrentYearInstant"
        ),
        /** 配当支払い */
        dividendsPaid: this.extractNumber(
          xmlData,
          "jppfs_cor:DividendsPaid",
          "CurrentYearDuration"
        ),
      },
      capitalExpenditure: {
        /** 減価償却費 */
        depreciation: this.extractNumber(
          xmlData,
          "jppfs_cor:CapitalInvestment",
          "CurrentYearDuration"
        ),
        /** 無形固定資産の償却 */
        amortization: this.extractNumber(
          xmlData,
          "jppfs_cor:AmortizationOfGoodwillOpeCF",
          "CurrentYearDuration"
        ),
        /** 設備投資 */
        equipmentInvestment: this.extractNumber(
          xmlData,
          "jpcrp_cor:IncreaseInPropertyPlantAndEquipmentAndIntangibleAssets",
          "CurrentYearDuration"
        ),
        /** 研究開発費 */
        researchAndDevelopmentExpenses: this.extractNumber(
          xmlData,
          "jpcrp_cor:ResearchAndDevelopmentExpensesResearchAndDevelopmentActivities",
          "CurrentYearDuration"
        ),
      },
      stockInfo: {
        /** 株式発行総数 */
        stockAmount: this.extractNumber(
          xmlData,
          "jpcrp_cor:TotalNumberOfIssuedSharesSummaryOfBusinessResults",
          context
        ),
      },
    };
  }

  /**
   * ROICを計算する
   * @param financialStatement
   * @returns
   */
  public calcROIC(financialStatement: FinancialData): number {
    const equity = financialStatement.balanceSheet.netAssets.equity;
    const debt = financialStatement.balanceSheet.liabilities.debt;
    const operatingIncome = financialStatement.incomeStatement.operatingIncome;
    const tax = financialStatement.incomeStatement.tax;
    const incomeBeforeIncomeTaxes =
      financialStatement.incomeStatement.incomeBeforeIncomeTaxes;
    if (equity + debt === 0) {
      throw "自己資本と有利子負債の合計が0になったため計算できません";
    }
    if (incomeBeforeIncomeTaxes > 0) {
      const taxRate = tax / incomeBeforeIncomeTaxes;
      return (operatingIncome * (1 - taxRate)) / (equity + debt);
    }
    return (operatingIncome * 0.7) / (equity + debt);
  }

  /**
   * ROEを計算する
   * @param financialStatement
   * @returns
   */
  public calcROE(financialStatement: FinancialData): number {
    const equity = financialStatement.balanceSheet.netAssets.equity;
    const profitLoss = financialStatement.incomeStatement.profitLoss;

    if (equity === 0) {
      throw "自己資本が0になったため計算できません";
    }
    if (equity < 0) {
      throw "自己資本がマイナスになったため計算できません";
    }
    return profitLoss / equity;
  }

  /**
   * ROAを計算する
   * @param financialStatement
   * @returns
   */
  public calcROA(financialStatement: FinancialData): number {
    const assets = financialStatement.balanceSheet.assets.asset;
    const profitLoss = financialStatement.incomeStatement.profitLoss;
    if (assets === 0) {
      throw "資産が0になったため計算できません";
    }
    if (assets < 0) {
      throw "資産がマイナスになったため計算できません";
    }
    return profitLoss / assets;
  }

  /**
   * 自己資本比率を計算する
   * @param financialStatement
   * @returns
   */
  public calcEquityRatio(financialStatement: FinancialData): number {
    const equity = financialStatement.balanceSheet.netAssets.equity;
    const assets = financialStatement.balanceSheet.assets.asset;
    if (assets === 0) {
      throw "資産が0になったため計算できません";
    }
    return equity / assets;
  }

  /**
   * 粗利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcGrossProfitMargin(financialStatement: FinancialData): number {
    const sales = financialStatement.incomeStatement.sales;
    const costOfSales = financialStatement.incomeStatement.costOfSales;
    if (sales === 0) {
      throw "売上高が0になったため計算できません";
    }
    return (sales - costOfSales) / sales;
  }

  /**
   * 営業利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcOperatingProfitMargin(financialStatement: FinancialData): number {
    const operatingIncome = financialStatement.incomeStatement.operatingIncome;
    const sales = financialStatement.incomeStatement.sales;
    if (sales === 0) {
      throw "売上高が0になったため計算できません";
    }
    return operatingIncome / sales;
  }

  /**
   * 経常利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcOrdinaryProfitMargin(financialStatement: FinancialData): number {
    const ordinaryIncome = financialStatement.incomeStatement.ordinaryIncome;
    const sales = financialStatement.incomeStatement.sales;
    if (sales === 0) {
      throw "売上高が0になったため計算できません";
    }
    return ordinaryIncome / sales;
  }

  /**
   * 当期純利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcNetProfitMargin(financialStatement: FinancialData): number {
    const profitLoss = financialStatement.incomeStatement.profitLoss;
    const sales = financialStatement.incomeStatement.sales;
    if (sales === 0) {
      throw "売上高が0になったため計算できません";
    }
    return profitLoss / sales;
  }

  /**
   * 正味流動資産を計算する
   * @param financialStatement
   * @returns
   */
  public calcNetCurrentAssets(financialStatement: FinancialData): number {
    const cash = financialStatement.cashFlowStatement.cashAndCashEquivalents;
    const accountsReceivable =
      financialStatement.balanceSheet.assets.accountsReceivable;
    const securities = financialStatement.balanceSheet.assets.securities;
    const land = financialStatement.balanceSheet.assets.land;
    const investmentSecurities =
      financialStatement.balanceSheet.assets.investmentSecurities;
    const liabilities = financialStatement.balanceSheet.liabilities.liability;
    try {
      return (
        ((cash +
          accountsReceivable +
          securities +
          land +
          investmentSecurities -
          liabilities) *
          2) /
        3
      );
    } catch (error) {
      console.log(error);
      throw "計算できません";
    }
  }

  /**
   * NOPATを計算する
   * @param financialStatement
   * @returns
   */
  public calcNOPAT(financialStatement: FinancialData): number {
    const operatingIncome = financialStatement.incomeStatement.operatingIncome;
    const tax = financialStatement.incomeStatement.tax;
    return operatingIncome - tax;
  }

  /**
   * 非現金支出を計算する
   * @param financialStatement
   * @returns
   */
  public calcNonCashExpenses(financialStatement: FinancialData): number {
    const amortization = financialStatement.capitalExpenditure.amortization;
    const depreciation = financialStatement.capitalExpenditure.depreciation;
    return amortization + depreciation;
  }

  public calcWorkingCapital(xmlData: any): number {
    const currentAssets = this.extractNumber(
      xmlData,
      "jppfs_cor:CurrentAssets",
      "CurrentYearInstant"
    );
    const currentAssetsOneYearAgo = this.extractNumber(
      xmlData,
      "jppfs_cor:CurrentAssets",
      "Prior1YearInstant"
    );
    const cash = this.extractNumber(
      xmlData,
      "jppfs_cor:CashAndDeposits",
      "CurrentYearInstant"
    );
    const cashOneYearAgo = this.extractNumber(
      xmlData,
      "jppfs_cor:CashAndDeposits",
      "Prior1YearInstant"
    );

    const currentPortionOfLongTermLoansPayable = this.extractNumber(
      xmlData,
      "jppfs_cor:CurrentPortionOfLongTermLoansPayable",
      "CurrentYearDuration"
    );
    const shortTermLoansPayable = this.extractNumber(
      xmlData,
      "jppfs_cor:ShortTermLoansPayable",
      "CurrentYearDuration"
    );
    const notesAndAccountsPayableTrade = this.extractNumber(
      xmlData,
      "jppfs_cor:NotesAndAccountsPayableTrade",
      "CurrentYearDuration"
    );
    const currentPortionOfLongTermLoansPayableOneYearAgo = this.extractNumber(
      xmlData,
      "jppfs_cor:CurrentPortionOfLongTermLoansPayable",
      "Prior1YearInstant"
    );

    const shortTermLoansPayableOneYearAgo = this.extractNumber(
      xmlData,
      "jppfs_cor:ShortTermLoansPayable",
      "Prior1YearInstant"
    );

    const notesAndAccountsPayableTradeOneYearAgo = this.extractNumber(
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
    const result =
      currentAssetsWithoutCash -
      accountsPayable -
      (currentAssetsWithoutCashOneYearAgo - accountsPayableOneYearAgo);
    return result;
  }

  /**
   * FCFを計算する
   * @param nopat
   * @param nonCashExpenses
   * @param workingCapital
   * @returns
   */
  public calcFCF(
    nopat: number,
    nonCashExpenses: number,
    workingCapital: number
  ): number {
    return nopat - nonCashExpenses - workingCapital;
  }

  public calcEVA(
    roic: number,
    capitalCost: number,
    investedCapital: number
  ): number {
    return investedCapital * (roic - capitalCost);
  }

  public calcDCF(
    fcf: number,
    discountRate: number,
    growthRate: number
  ): number {
    if (fcf === 0) {
      throw "FCFが0になったため計算できません";
    }
    let result = 0;
    for (let index = 0; index < 5; index++) {
      result += fcf / Math.pow(1 + discountRate, index + 1);
      fcf = fcf * (1 + growthRate);
    }
    return result;
  }

  /**
   * 数値を抽出する
   * @param xmlData
   * @param key タグ名
   * @param context
   * @returns
   */
  private extractNumber(xmlData: any, key: string, context: string): number {
    try {
      const value = xmlData["xbrli:xbrl"][key]?.find(
        (item: any) => item["$"].contextRef === context
      );
      return value ? parseInt(value["_"], 10) : 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * 文字列を抽出する
   * @param xmlData
   * @param key
   * @returns
   */
  private extractValue(xmlData: any, key: string, context: string): string {
    try {
      const value = xmlData["xbrli:xbrl"][key]?.find(
        (item: any) => item["$"].contextRef === context
      );
      return value ? value["_"] : "";
    } catch (error) {
      return "";
    }
  }

  private getQuarterType(quarter: string): QuarterType {
    switch (quarter) {
      case "Q1":
        return "Q1";
      case "Q2":
        return "Q2";
      case "Q3":
        return "Q3";
      case "Q4":
        return "Q4";
      default:
        return "FY";
    }
  }
}
