import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class BalanceSheetDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): Prisma.BalanceSheetCreateInput {
    return {
      statements: {
        connect: {
          id: statementId,
        },
      },
      asset: this.financialData.balanceSheet.assets.asset,
      currentAsset: this.financialData.balanceSheet.assets.currentAssets,
      cashAndDeposit: this.financialData.balanceSheet.assets.cashAndDeposits,
      accountsReceivable:
        this.financialData.balanceSheet.assets.accountsReceivable,
      merchandiseAndFinishedGood:
        this.financialData.balanceSheet.assets.merchandiseAndFinishedGoods,
      security: this.financialData.balanceSheet.assets.securities,
      inventory: this.financialData.balanceSheet.assets.inventory,
      otherCurrentAsset:
        this.financialData.balanceSheet.assets.otherCurrentAssets,
      fixedAsset: this.financialData.balanceSheet.assets.fixedAssets,
      tangibleFixedAsset:
        this.financialData.balanceSheet.assets.tangibleFixedAssets,
      land: this.financialData.balanceSheet.assets.land,
      intangibleFixedAsset:
        this.financialData.balanceSheet.assets.intangibleFixedAssets,
      investmentSecurity:
        this.financialData.balanceSheet.assets.investmentSecurities,
      otherAsset: this.financialData.balanceSheet.assets.other,
      liability: this.financialData.balanceSheet.liabilities.liability,
      currentLiability:
        this.financialData.balanceSheet.liabilities.currentLiabilities,
      accountsPayable:
        this.financialData.balanceSheet.liabilities.accountsPayable,
      otherCurrentLiability:
        this.financialData.balanceSheet.liabilities.otherCurrentLiabilities,
      otherLiability: this.financialData.balanceSheet.liabilities.other,
      netAsset: this.financialData.balanceSheet.netAssets.total,
      equity: this.financialData.balanceSheet.netAssets.equity,

      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
