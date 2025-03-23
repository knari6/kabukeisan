import { beforeAll, describe, expect, it } from "vitest";
import { ProfitLossStatementDto } from "../../src/dto/profit-loss-statement";
import { financialTestData } from "./financial-data";

describe("ProfitLossStatementDto", () => {
  let profitLossStatementDto: ProfitLossStatementDto;

  beforeAll(() => {
    profitLossStatementDto = new ProfitLossStatementDto(financialTestData);
  });

  describe("dto", () => {
    it("ProfitLossStatementDtoを作ること", () => {
      const statementId = 1;
      const dto = profitLossStatementDto.dto(statementId);

      expect(dto).toBeDefined();

      expect(dto.sale).toEqual(financialTestData.incomeStatement.sale);
      expect(dto.grossProfit).toEqual(
        financialTestData.incomeStatement.sale -
          financialTestData.incomeStatement.costOfSale
      );
      expect(dto.operatingProfit).toEqual(
        financialTestData.incomeStatement.operatingIncome
      );
      expect(dto.ordinaryProfit).toEqual(
        financialTestData.incomeStatement.ordinaryIncome
      );
      expect(dto.netIncome).toEqual(
        financialTestData.incomeStatement.profitLoss
      );
      expect(dto.profitBeforeTax).toEqual(
        financialTestData.incomeStatement.incomeBeforeIncomeTax
      );
      expect(dto.tax).toEqual(financialTestData.incomeStatement.tax);
    });
  });
});
