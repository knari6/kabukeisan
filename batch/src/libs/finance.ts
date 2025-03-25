import { File } from "./file";
import { FinancialData, QuarterType } from "./interfaces";

export class Finance {
  private readonly xmlData: any;
  private readonly fiscalYear: string;
  private readonly docID: string;
  private readonly informationContext = "FilingDateInstant";
  private readonly context = "CurrentYearInstant_NonConsolidatedMember";
  private readonly durationContext =
    "CurrentYearDuration_NonConsolidatedMember";
  private readonly oneYearAgo = "Prior1YearInstant";
  constructor(xmlData: any, fiscalYear: string, docID: string) {
    this.xmlData = xmlData;
    this.fiscalYear = fiscalYear;
    this.docID = docID;
  }

  /** 証券コード */
  public get code(): string {
    return this.extractValue(
      this.xmlData,
      "jpdei_cor:SecurityCodeDEI",
      this.informationContext
    );
  }

  /** 提出日 */
  public get fillingDate(): string {
    return this.extractValue(
      this.xmlData,
      "jpcrp_cor:FilingDateCoverPage",
      this.informationContext
    );
  }

  /** 会社名 */
  public get companyName(): string {
    return this.extractValue(
      this.xmlData,
      "jpdei_cor:FilerNameInJapaneseDEI",
      this.informationContext
    );
  }

  /** 四半期 */
  public get quaeterType(): QuarterType {
    return this.getQuarterType(
      this.extractValue(
        this.xmlData,
        "jppfs_cor:Quarter",
        this.informationContext
      )
    );
  }

  /** 株数 */
  public get stockAmount(): number {
    return this.extractNumber(
      this.xmlData,
      "jpcrp_cor:TotalNumberOfIssuedSharesSummaryOfBusinessResults",
      this.context
    );
  }

  /** 流動資産 */
  public get currentAsset(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CurrentAssets",
      this.context
    );
  }

  /** 前期流動資産 */
  public get currentAssetOneYearAgo(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CurrentAssets",
      this.oneYearAgo
    );
  }

  /** 現金及び預金 */
  public get cash(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CashAndDeposits",
      this.context
    );
  }
  /** 前期現金及び預金 */
  public get cashOneYearAgo(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CashAndDeposits",
      this.oneYearAgo
    );
  }

  /** 売掛金 */
  public get accountReceivable(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:AccountsReceivableTrade",
        this.context
      ) ?? 0
    );
  }

  /** 前期売掛金 */
  public get prevAccountReceivable(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:AccountsReceivableTrade",
        this.oneYearAgo
      ) ?? 0
    );
  }

  /** 電子記録債権 */
  public get electronicallyRecordedMonetary(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:ElectronicallyRecordedMonetaryClaimsOperatingCA",
        this.context
      ) ?? 0
    );
  }

  /** 前期電子記録債権 */
  public get prevElectronicallyRecordedMonetary(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:ElectronicallyRecordedMonetaryClaimsOperatingCA",
        this.oneYearAgo
      ) ?? 0
    );
  }

  /** 商品 製品 */
  public get good(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:MerchandiseAndFinishedGoods",
      this.context
    );
  }

  /** 有価証券 */
  public get security(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:Securities",
      this.context
    );
  }

  /** 棚卸資産 */
  public get inventory(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:Inventory",
      this.context
    );
  }
  /** 前期棚卸資産 */
  public get prevInventory(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:Inventory",
      this.context
    );
  }

  /** その他流動資産 */
  public get otherCurrentAsset(): number {
    return this.extractNumber(this.xmlData, "jppfs_cor:OtherCA", this.context);
  }

  /** 固定資産 */
  public get fixedAsset(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NoncurrentAssets",
      this.context
    );
  }

  /** 土地 */
  public get land(): number {
    return this.extractNumber(this.xmlData, "jppfs_cor:Land", this.context);
  }

  /** 有形固定資産 */
  public get tangibleFixedAsset(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:PropertyPlantAndEquipment",
      this.context
    );
  }

  /** 無形固定資産 */
  public get intangibleFixedAsset(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:IntangibleAssets",
        this.context
      ) && 0
    );
  }

  /** 投資有価証券 */
  public get investmentSecurity(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:InvestmentsAndOtherAssets",
      "CurrentYearInstant"
    );
  }

  /** その他資産 */
  public get otherAsset(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:OtherAssets",
      this.context
    );
  }

  /** 資産合計 */
  public get asset(): number {
    return this.extractNumber(this.xmlData, "jppfs_cor:Assets", this.context);
  }

  /** 流動負債 */
  public get currentLiability(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CurrentLiabilities",
      this.context
    );
  }
  /** 買入債務 */
  public get accountPayable(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:AccountsPayableOperatingSpecific",
      this.context
    );
  }

  /** 前期買入債務 */
  public get prevAccountPayable(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:AccountsPayableOperatingSpecific",
      this.oneYearAgo
    );
  }

  /** 短期借入金 */
  public get debt(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:ShortTermLoansPayable",
      this.context
    );
  }

  /** その他流動負債 */
  public get otherCurrentLiability(): number {
    return this.extractNumber(this.xmlData, "jppfs_cor:OtherCL", this.context);
  }

  /** 固定負債 */
  public get fixedLiability(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:FixedLiabilities",
      this.context
    );
  }

  /** その他負債 */
  public get otherLiability(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:OtherLiabilities",
      this.context
    );
  }

  /** 負債合計 */
  public get liability(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:Liabilities",
      this.context
    );
  }

  /** 純資産 */
  public get netAsset(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NetAssets",
      this.context
    );
  }

  /** 株主資本 */
  public get equity(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:ShareholdersEquity",
      this.context
    );
  }

  /** 売上 */
  public get sale(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NetSales",
      this.durationContext
    );
  }

  /** 売上原価 */
  public get costOfSale(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CostOfSales",
      this.durationContext
    );
  }

  /** 営業利益 */
  public get operatingIncome(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:OperatingIncome",
      this.durationContext
    );
  }

  /** 経常利益 */
  public get ordinaryIncome(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:OrdinaryIncome",
      this.durationContext
    );
  }

  /** 税引き前当期純利益 */
  public get incomeBeforeTax(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:incomeBeforeTaxes",
      this.durationContext
    );
  }

  /** 法人税 */
  public get tax(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:IncomeTaxes",
      this.durationContext
    );
  }

  /** 当期純利益 */
  public get profitLoss(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:ProfitLoss",
      this.durationContext
    );
  }

  /** 営業CF */
  public get operatingCF(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NetCashProvidedByUsedInOperatingActivities",
      "CurrentYearDuration"
    );
  }

  /** 投資CF */
  public get investingCF(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NetCashProvidedByUsedInInvestmentActivities",
      "CurrentYearDuration"
    );
  }

  /** 財務CF */
  public get financeCF(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:NetCashProvidedByUsedInFinancingActivities",
      "CurrentYearDuration"
    );
  }

  /** 現金同等物 */
  public get cashAndCashEquivalent(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CashAndCashEquivalents",
      "CurrentYearInstant"
    );
  }

  /** 配当金 */
  public get dividendsPaid(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:DividendsPaid",
      "CurrentYearDuration"
    );
  }

  /** 減価償却費 */
  public get depreciation(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CapitalInvestment",
      "CurrentYearDuration"
    );
  }

  /** のれん償却費 */
  public get amortization(): number {
    return (
      this.extractNumber(
        this.xmlData,
        "jppfs_cor:AmortizationOfGoodwillOpeCF",
        "CurrentYearInstant"
      ) && 0
    );
  }

  /** 設備投資 */
  public get equipmentInvestiment(): number {
    return this.extractNumber(
      this.xmlData,
      "jpcrp_cor:IncreaseInPropertyPlantAndEquipmentAndIntangibleAssets",
      "CurrentYearDuration"
    );
  }

  /** 研究開発費 */
  public get researchAndDevelopment(): number {
    return this.extractNumber(
      this.xmlData,
      "jpcrp_cor:ResearchAndDevelopmentExpensesResearchAndDevelopmentActivities",
      "CurrentYearDuration"
    );
  }

  /** 有利子負債 */
  public get currentPortionOfLongTermLoansPayable(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:CurrentPortionOfLongTermLoansPayable",
      "CurrentYearDuration"
    );
  }

  /** 長期借入金 */
  public get longTermLoan(): number {
    return this.extractNumber(
      this.xmlData,
      "jppfs_cor:LongTermLoansPayable",
      "CurrentYearInstant_NonConsolidatedMember"
    );
  }

  /**
   * xbrlファイルから財務諸表を抽出する
   * @param xmlData
   * @returns FinancialData
   */
  public extractFinancialStatements(): FinancialData {
    const code = this.code;
    const file = new File();
    if (!code) {
      file.deleteFile(this.docID);
      throw "証券コードがありません";
    }
    return {
      information: {
        code: code.substring(0, 4),
        year: this.fiscalYear.substring(0, 4),
        companyName: this.companyName,
        filingDate: this.fillingDate,
        fiscalPeriod: this.fiscalYear.substring(0, 4),
        quarterType: this.quaeterType,
      },
      balanceSheet: {
        currentAsset: this.currentAsset,
        cashAndDeposit: this.cash,
        accountsReceivable: this.accountReceivable,
        merchandiseAndFinishedGood: this.good,
        security: this.security,
        inventory: this.inventory,
        otherCurrentAsset: this.otherCurrentAsset,
        fixedAsset: this.fixedAsset,
        tangibleFixedAsset: this.tangibleFixedAsset,
        land: this.land,
        intangibleFixedAsset: this.intangibleFixedAsset,
        investmentSecurity: this.investmentSecurity,
        otherAsset: this.otherAsset,
        asset: this.asset,
        currentLiability: this.currentLiability,
        accountsPayable: this.accountPayable,
        debt: this.debt,
        otherCurrentLiability: this.otherCurrentLiability,
        fixedLiability: this.fixedLiability,
        otherLiability: this.otherLiability,
        liability: this.liability,
        netAsset: this.netAsset,
        equity: this.equity,
      },
      incomeStatement: {
        sale: this.sale,
        costOfSale: this.costOfSale,
        operatingIncome: this.operatingIncome,
        ordinaryIncome: this.ordinaryIncome,
        incomeBeforeTax: this.incomeBeforeTax,
        tax: this.tax,
        profitLoss: this.profitLoss,
      },
      cashFlowStatement: {
        operatingCF: this.operatingCF,
        investingCF: this.investingCF,
        financeCF: this.financeCF,
        cashAndCashEquivalent: this.cashAndCashEquivalent,
        dividendsPaid: this.dividendsPaid,
      },
      capitalExpenditure: {
        depreciation: this.depreciation,
        amortization: this.amortization,
        equipmentInvestment: this.equipmentInvestiment,
        researchAndDevelopment: this.researchAndDevelopment,
      },
      interestBearingDebt: {
        debt: this.currentPortionOfLongTermLoansPayable + this.longTermLoan,
      },
      stockInfo: {
        /** 株式発行総数 */
        stockAmount: this.stockAmount,
      },
    };
  }

  /**
   * ROICを計算する
   * @param financialStatement
   * @returns
   */
  public calcROIC(financialStatement: FinancialData): number {
    const equity = financialStatement.balanceSheet.equity;
    const debt = financialStatement.balanceSheet.debt;
    const operatingIncome = financialStatement.incomeStatement.operatingIncome;
    const tax = financialStatement.incomeStatement.tax;
    const incomeBeforeTax = financialStatement.incomeStatement.incomeBeforeTax;
    if (equity + debt === 0) {
      throw "自己資本と有利子負債の合計が0になったため計算できません";
    }
    if (incomeBeforeTax > 0) {
      const taxRate = tax / incomeBeforeTax;
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
    const equity = financialStatement.balanceSheet.equity;
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
    const assets = financialStatement.balanceSheet.asset;
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
    const equity = financialStatement.balanceSheet.equity;
    const assets = financialStatement.balanceSheet.asset;
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
    const sale = financialStatement.incomeStatement.sale;
    const costOfSale = financialStatement.incomeStatement.costOfSale;
    if (sale === 0) {
      throw "売上高が0になったため計算できません";
    }
    return (sale - costOfSale) / sale;
  }

  /**
   * 営業利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcOperatingProfitMargin(financialStatement: FinancialData): number {
    const operatingIncome = financialStatement.incomeStatement.operatingIncome;
    const sale = financialStatement.incomeStatement.sale;
    if (sale === 0) {
      throw "売上高が0になったため計算できません";
    }
    return operatingIncome / sale;
  }

  /**
   * 経常利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcOrdinaryProfitMargin(financialStatement: FinancialData): number {
    const ordinaryIncome = financialStatement.incomeStatement.ordinaryIncome;
    const sale = financialStatement.incomeStatement.sale;
    if (sale === 0) {
      throw "売上高が0になったため計算できません";
    }
    return ordinaryIncome / sale;
  }

  /**
   * 当期純利益率を計算する
   * @param financialStatement
   * @returns
   */
  public calcNetProfitMargin(financialStatement: FinancialData): number {
    const profitLoss = financialStatement.incomeStatement.profitLoss;
    const sale = financialStatement.incomeStatement.sale;
    if (sale === 0) {
      throw "売上高が0になったため計算できません";
    }
    return profitLoss / sale;
  }

  /**
   * 正味流動資産を計算する
   * @param financialStatement
   * @returns
   */
  public calcNetCurrentAssets(financialStatement: FinancialData): number {
    const cash = financialStatement.cashFlowStatement.cashAndCashEquivalent;
    const accountsReceivable =
      financialStatement.balanceSheet.accountsReceivable;
    const securities = financialStatement.balanceSheet.security;
    const land = financialStatement.balanceSheet.land;
    const investmentSecurities =
      financialStatement.balanceSheet.investmentSecurity;
    const liabilities = financialStatement.balanceSheet.liability;
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

  public calcWorkingCapital(
    accountsReceivable: number,
    inventory: number,
    accountsPayable: number,
    prevAccountReceivable: number,
    prevInventory: number,
    prevAccountPayable: number
  ): number {
    const thisYear = accountsReceivable + inventory - accountsPayable;
    const prevYear = prevAccountReceivable + prevInventory - prevAccountPayable;
    return thisYear - prevYear;
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
   * @param this.context
   * @returns
   */
  private extractNumber(xmlData: any, key: string, ontext: string): number {
    try {
      const value = xmlData["xbrli:xbrl"][key]?.find(
        (item: any) => item["$"].contextRef === this.context
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
