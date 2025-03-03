import { beforeAll, describe, expect, it } from "vitest";
import { DebtDto } from "../../src/dto/debt";
import { financialTestData } from "./financial-data";
import { PrismaService } from "../../src/services/prisma.service";

describe("DebtDto", () => {
  let debtDto: DebtDto;
  const prismaService = new PrismaService();

  beforeAll(() => {
    debtDto = new DebtDto(prismaService, financialTestData);
  });

  describe("dto", () => {
    it("DebtDtoを作ること", () => {
      const statementId = 1;
      const dto = debtDto.dto(statementId);

      expect(dto).toBeDefined();
      expect(dto.statementId).toBe(statementId);
      expect(dto.interestBearingDebt).toEqual(
        financialTestData.balanceSheet.liabilities.debt
      );
    });
  });
});
