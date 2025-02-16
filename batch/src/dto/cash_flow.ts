import { FinancialData } from "../libs/interfaces";

type CashFlowDtoType = {
  operatingCf: number;
  investingCf: number;
  financialCf: number;
  dividendPaid: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CashFlowDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(): CashFlowDtoType {
    return {
      operatingCf:
        this.financialData.cashFlowStatement
          .netCashProvidedByOperatingActivities,
      investingCf:
        this.financialData.cashFlowStatement
          .netCashProvidedByInvestingActivities,
      financialCf:
        this.financialData.cashFlowStatement
          .netCashProvidedByFinancingActivities,
      dividendPaid: this.financialData.cashFlowStatement.dividendsPaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
