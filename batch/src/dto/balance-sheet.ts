import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class BalanceSheetDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(companyId: number): Prisma.BalanceSheetCreateInput {
    return {
      company: {
        connect: {
          id: companyId,
        },
      },
      asset: this.financialData.balanceSheet.asset,
      currentAsset: this.financialData.balanceSheet.currentAsset,
      cashAndDeposit: this.financialData.balanceSheet.cashAndDeposit,
      accountsReceivable: this.financialData.balanceSheet.accountsReceivable,
      good: this.financialData.balanceSheet.merchandiseAndFinishedGood,
      security: this.financialData.balanceSheet.security,
      inventory: this.financialData.balanceSheet.inventory,
      otherCurrentAsset: this.financialData.balanceSheet.otherCurrentAsset,
      fixedAsset: this.financialData.balanceSheet.fixedAsset,
      tangibleFixedAsset: this.financialData.balanceSheet.tangibleFixedAsset,
      land: this.financialData.balanceSheet.land,
      intangibleFixedAsset:
        this.financialData.balanceSheet.intangibleFixedAsset,
      investmentSecurity: this.financialData.balanceSheet.investmentSecurity,
      otherAsset: this.financialData.balanceSheet.otherAsset,
      liability: this.financialData.balanceSheet.liability,
      currentLiability: this.financialData.balanceSheet.currentLiability,
      accountsPayable: this.financialData.balanceSheet.accountsPayable,
      otherCurrentLiability:
        this.financialData.balanceSheet.otherCurrentLiability,
      otherLiability: this.financialData.balanceSheet.otherLiability,
      netAsset: this.financialData.balanceSheet.netAsset,
      equity: this.financialData.balanceSheet.equity,

      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
