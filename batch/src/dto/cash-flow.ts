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
        this.financialData.cashFlowStatement
          .netCashProvidedByOperatingActivities,
      investingCashFlow:
        this.financialData.cashFlowStatement
          .netCashProvidedByInvestingActivities,
      financingCashFlow:
        this.financialData.cashFlowStatement
          .netCashProvidedByFinancingActivities,
      cashAndCashEquivalent:
        this.financialData.cashFlowStatement.cashAndCashEquivalents,
      dividendPaid: this.financialData.cashFlowStatement.dividendsPaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
