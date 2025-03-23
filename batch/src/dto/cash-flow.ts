import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class CashFlowDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(companyId: number): Prisma.CashFlowCreateInput {
    return {
      company: {
        connect: {
          id: companyId,
        },
      },
      operatingCashFlow:
        this.financialData.cashFlowStatement.netCashProvidedByOperatingActivity,
      investingCashFlow:
        this.financialData.cashFlowStatement.netCashProvidedByInvestingActivity,
      financingCashFlow:
        this.financialData.cashFlowStatement.netCashProvidedByFinancingActivity,
      cashAndCashEquivalent:
        this.financialData.cashFlowStatement.cashAndCashEquivalent,
      dividendPaid: this.financialData.cashFlowStatement.dividendsPaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
