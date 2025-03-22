import { beforeAll, describe, expect, it } from "vitest";
import { DebtDto } from "../../src/dto/debt";
import { financialTestData } from "./financial-data";

describe("DebtDto", () => {
  let debtDto: DebtDto;

  beforeAll(() => {
    debtDto = new DebtDto(financialTestData);
  });

  describe("dto", () => {
    it("DebtDtoを作ること", async () => {
      const dto = debtDto.dto(1);
      expect(dto).toBeDefined();
      expect(dto.interestBearingDebt).toEqual(
        financialTestData.interestBearingDebt.debt
      );
    });
  });
});
