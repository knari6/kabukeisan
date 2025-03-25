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
      operatingCashFlow: this.financialData.cashFlowStatement.operatingCF,
      investingCashFlow: this.financialData.cashFlowStatement.investingCF,
      financingCashFlow: this.financialData.cashFlowStatement.financeCF,
      cashAndCashEquivalent:
        this.financialData.cashFlowStatement.cashAndCashEquivalent,
      dividendPaid: this.financialData.cashFlowStatement.dividendsPaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
