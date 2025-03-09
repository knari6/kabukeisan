import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class BalanceSheetDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): Prisma.BalanceSheetCreateInput {
    return {
      statement: {
        connect: {
          id: statementId,
        },
      },
      assets: this.financialData.balanceSheet.assets.asset,
      currentAssets: this.financialData.balanceSheet.assets.currentAssets,
      cashAndDeposits: this.financialData.balanceSheet.assets.cashAndDeposits,
      accountsReceivable:
        this.financialData.balanceSheet.assets.accountsReceivable,
      merchandiseAndFinishedGoods:
        this.financialData.balanceSheet.assets.merchandiseAndFinishedGoods,
      securities: this.financialData.balanceSheet.assets.securities,
      inventory: this.financialData.balanceSheet.assets.inventory,
      otherCurrentAssets:
        this.financialData.balanceSheet.assets.otherCurrentAssets,
      fixedAssets: this.financialData.balanceSheet.assets.fixedAssets,
      tangibleFixedAssets:
        this.financialData.balanceSheet.assets.tangibleFixedAssets,
      land: this.financialData.balanceSheet.assets.land,
      intangibleFixedAssets:
        this.financialData.balanceSheet.assets.intangibleFixedAssets,
      investmentSecurities:
        this.financialData.balanceSheet.assets.investmentSecurities,
      other: this.financialData.balanceSheet.assets.other,

      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
