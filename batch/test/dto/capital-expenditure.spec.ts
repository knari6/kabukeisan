import { beforeAll, describe, expect, it } from "vitest";

import { financialTestData } from "./financial-data";
import { PrismaService } from "../../src/services/prisma.service";
import { CapitalExpenditureDto } from "../../src/dto/capital-expenditure";
describe("DepreciationDto", () => {
  let depreciationDto: CapitalExpenditureDto;

  beforeAll(() => {
    depreciationDto = new CapitalExpenditureDto(financialTestData);
  });

  describe("dto", () => {
    it("DepreciationDtoを作ること", () => {
      const dto = depreciationDto.dto(1);
      console.log(dto);

      expect(dto).toBeDefined();
      expect(dto.depreciation).toEqual(
        financialTestData.capitalExpenditure.depreciation
      );
      expect(dto.amortization).toEqual(
        financialTestData.capitalExpenditure.amortization
      );
      expect(dto.depreciationAmortization).toEqual(
        financialTestData.capitalExpenditure.depreciation +
          financialTestData.capitalExpenditure.amortization
      );
      expect(dto.capitalExpenditure).toEqual(
        financialTestData.capitalExpenditure.equipmentInvestment
      );
      expect(dto.researchAndDevelopment).toEqual(
        financialTestData.capitalExpenditure.researchAndDevelopmentExpenses
      );
    });
  });
});
