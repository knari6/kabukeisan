import { beforeAll, describe, expect, it } from "vitest";

import { financialTestData } from "./financial-data";
import { PrismaService } from "../../src/services/prisma.service";
import { DepreciationDto } from "../../src/dto/depreciation";
describe("DepreciationDto", () => {
  let depreciationDto: DepreciationDto;
  const prismaService = new PrismaService();

  beforeAll(() => {
    depreciationDto = new DepreciationDto(financialTestData);
  });

  describe("dto", () => {
    it("DepreciationDtoを作ること", () => {
      const statementId = 1;
      const dto = depreciationDto.dto(statementId);

      expect(dto).toBeDefined();
      expect(dto.depreciation).toEqual(
        financialTestData.capitalAndRDExpenses.depreciation
      );
      expect(dto.amortization).toEqual(
        financialTestData.capitalAndRDExpenses.amortization
      );
      expect(dto.depreciationAmortization).toEqual(
        financialTestData.capitalAndRDExpenses.depreciation +
          financialTestData.capitalAndRDExpenses.amortization
      );
      expect(dto.capitalExpenditure).toEqual(
        financialTestData.capitalAndRDExpenses.equipmentInvestment
      );
      expect(dto.researchAndDevelopment).toEqual(
        financialTestData.capitalAndRDExpenses.researchAndDevelopmentExpenses
      );
    });
  });
});
