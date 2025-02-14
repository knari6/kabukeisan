import { PrismaClient } from "@prisma/client";
import { FinancialStatement } from "../libs/interfaces";

export class AccountDataRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public dto(data: FinancialStatement) {
    return {
      code: data.information.code,
      year: data.information.fiscalPeriod,
      current_asset: data.balanceSheet.assets.currentAssets.toString(),
      cash: data.balanceSheet.assets.cashAndDeposits.toString(),
      trade_receivable: data.balanceSheet.assets.accountsReceivable.toString(),
      securities: data.balanceSheet.assets.securities.toString(),
      inventory: data.balanceSheet.assets.inventory.toString(),
      other_current_asset:
        data.balanceSheet.assets.otherCurrentAssets.toString(),

      fixed_asset: data.balanceSheet.assets.fixedAssets.toString(),
      tangible_asset: data.balanceSheet.assets.fixedAssets.toString(),
      tangible_fixed_asset: data.balanceSheet.assets.fixedAssets.toString(),
      land: data.balanceSheet.assets.fixedAssets.toString(),
      intangible_fixed_asset: data.balanceSheet.assets.fixedAssets.toString(),
      investment: data.balanceSheet.assets.investmentSecurities.toString(),
      other_asset: data.balanceSheet.assets.other.toString(),
      assets: data.balanceSheet.assets.toString(),

      liability: data.balanceSheet.liabilities.currentLiabilities.toString(),
      current_liability:
        data.balanceSheet.liabilities.currentLiabilities.toString(),
      debt: data.balanceSheet.liabilities.debt.toString(),
      other_current_liability:
        data.balanceSheet.liabilities.otherCurrentLiabilities.toString(),
      fixed_liability:
        data.balanceSheet.liabilities.fixedLiabilities.toString(),

      equity: data.balanceSheet.netAssets.equity.toString(),
      net_assets: data.balanceSheet.netAssets.total.toString(),

      sale: data.incomeStatement.netSales.toString(),
      gross_profit: (
        data.incomeStatement.netSales - data.incomeStatement.costOfSales
      ).toString(),
      operating_income: data.incomeStatement.operatingIncome.toString(),
      ordinary_income: data.incomeStatement.ordinaryIncome.toString(),
      pre_tax_profit: data.incomeStatement.incomeBeforeIncomeTaxes.toString(),
      profit: data.incomeStatement.profitLoss.toString(),

      depreciation_amortization: (
        data.capitalAndRDExpenses.amortization +
        data.capitalAndRDExpenses.depreciation
      ).toString(),
      research_and_development:
        data.capitalAndRDExpenses.researchAndDevelopmentExpenses.toString(),
      equipment_investment:
        data.capitalAndRDExpenses.equipmentInvestment.toString(),
      operating_activities:
        data.cashFlowStatement.netCashProvidedByOperatingActivities.toString(),
      investment_activities:
        data.cashFlowStatement.netCashProvidedByInvestingActivities.toString(),
      financing_activities:
        data.cashFlowStatement.netCashProvidedByFinancingActivities.toString(),
      dividends_paid: data.cashFlowStatement.dividendsPaid.toString(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  public async write(data: FinancialStatement) {
    const accountData = this.dto(data);
    await this.prismaClient.accountDatas.create({
      data: accountData,
    });
  }
}
