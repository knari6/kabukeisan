import { beforeAll, describe, expect, it } from "vitest";
import { DebtDto } from "../../src/dto/debt";
import { financialTestData } from "./financial-data";

describe("DebtDto", () => {
  let debtDto: DebtDto;

  beforeAll(() => {
    debtDto = new DebtDto(financialTestData);
  });

  describe("dto", () => {
    it("DebtDtoを作ること", () => {
      const statementId = 1;
      const dto = debtDto.dto(statementId);

      expect(dto).toBeDefined();
      expect(dto.statements.connect?.id).toBe(statementId);
      expect(dto.interestBearingDebt).toEqual(
        financialTestData.balanceSheet.liabilities.debt
      );
    });
  });
});
