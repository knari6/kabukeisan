import { Prisma } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";

export class CashFlowDto {
  private readonly financialData: FinancialData;
  constructor(financialData: FinancialData) {
    this.financialData = financialData;
  }

  public dto(statementId: number): Prisma.CashFlowStatementCreateInput {
    return {
      statement: {
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
      cashAndCashEquivalents:
        this.financialData.cashFlowStatement.cashAndCashEquivalents,
      devidendPaid: this.financialData.cashFlowStatement.dividendsPaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
