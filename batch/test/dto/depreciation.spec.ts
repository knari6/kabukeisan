import { beforeAll, describe, expect, it } from "vitest";
import { Depriciation } from "../../src/dto/depreciation";
import { financialTestData } from "./financial-data";
import { PrismaService } from "../../src/services/prisma.service";

describe("DepreciationDto", () => {
  let depreciationDto: Depriciation;
  const prismaService = new PrismaService();

  beforeAll(() => {
    depreciationDto = new Depriciation(prismaService, financialTestData);
  });

  describe("dto", () => {
    it("DepreciationDtoを作ること", () => {
      const statementId = 1;
      const dto = depreciationDto.dto(statementId);

      expect(dto).toBeDefined();
      expect(dto.statementId).toBe(statementId);
      expect(dto.depreciation).toEqual(
        financialTestData.capitalAndRDExpenses.depreciation
      );
      expect(dto.amortization).toEqual(
        financialTestData.capitalAndRDExpenses.amortization
      );
      expect(dto.depreciationAndAmortization).toEqual(
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
