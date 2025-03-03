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
      expect(dto.operatingCf).toEqual(
        financialTestData.cashFlowStatement.netCashProvidedByOperatingActivities
      );
      expect(dto.investingCf).toEqual(
        financialTestData.cashFlowStatement.netCashProvidedByInvestingActivities
      );
      expect(dto.financialCf).toEqual(
        financialTestData.cashFlowStatement.netCashProvidedByFinancingActivities
      );
    });
  });
});
