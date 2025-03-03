import { beforeAll, describe, expect, it } from "vitest";
import { FinancialStatementDto } from "../../src/dto/financial-statement";
import { financialTestData } from "./financial-data";
import { PrismaService } from "../../src/services/prisma.service";
import { QuarterType } from "../../src/libs/interfaces";

describe("FinancialStatementDto", () => {
  let financialStatementDto: FinancialStatementDto;
  const prismaService = new PrismaService();
  const year = "2023";
  const quarterType: QuarterType = 4;

  beforeAll(() => {
    financialStatementDto = new FinancialStatementDto(
      prismaService,
      financialTestData,
      year,
      quarterType
    );
  });

  describe("dto", () => {
    it("FinancialStatementDtoを作ること", () => {
      const dto = financialStatementDto.dto(financialTestData);

      expect(dto).toBeDefined();
      expect(dto.companyId).toEqual(financialTestData.information.code);
      expect(dto.name).toEqual(financialTestData.information.companyName);
      expect(dto.year).toEqual(year);
      expect(dto.quarterType).toEqual(quarterType);
      expect(dto.stockAmount).toEqual(financialTestData.stockInfo.stockAmount);
    });
  });
});
