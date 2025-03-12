import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class CashFlowDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): Prisma.CashFlowStatementsCreateInput {
    return {
      statements: {
        connect: {
          id: statementId,
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
