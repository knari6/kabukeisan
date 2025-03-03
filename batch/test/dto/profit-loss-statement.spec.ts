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
      expect(dto.statementId).toBe(statementId);
      expect(dto.sale).toEqual(financialTestData.incomeStatement.sales);
      expect(dto.netSale).toEqual(
        financialTestData.incomeStatement.sales -
          financialTestData.incomeStatement.costOfSales
      );
      expect(dto.operatingIncome).toEqual(
        financialTestData.incomeStatement.operatingIncome
      );
      expect(dto.ordinaryIncome).toEqual(
        financialTestData.incomeStatement.ordinaryIncome
      );
      expect(dto.profit).toEqual(financialTestData.incomeStatement.profitLoss);
    });
  });
});
