import { beforeAll, describe, expect, it } from "vitest";
import { CashFlowDto } from "../../src/dto/cash-flow";

import { financialTestData } from "./financial-data";
describe("CashFlowDto", () => {
  let cashFlowDto: CashFlowDto;

  beforeAll(() => {
    cashFlowDto = new CashFlowDto(financialTestData);
  });
  describe("dto", () => {
    it("CashFlowDtoを作ること", () => {
      const dto = cashFlowDto.dto(2);
      expect(dto).toBeDefined();
      expect(dto.operatingCashFlow).toEqual(
        financialTestData.cashFlowStatement.operatingCF
      );
      expect(dto.investingCashFlow).toEqual(
        financialTestData.cashFlowStatement.investingCF
      );
      expect(dto.financingCashFlow).toEqual(
        financialTestData.cashFlowStatement.financeCF
      );
      expect(dto.cashAndCashEquivalent).toEqual(
        financialTestData.cashFlowStatement.cashAndCashEquivalent
      );
      expect(dto.dividendPaid).toEqual(
        financialTestData.cashFlowStatement.dividendsPaid
      );
    });
  });
});
