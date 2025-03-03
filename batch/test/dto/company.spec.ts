import { beforeAll, describe, expect, it } from "vitest";
import { financialTestData } from "./financial-data";
import { CompanyDto } from "../../src/dto/company";

describe("CompanyDto", () => {
  let companyDto: CompanyDto;

  beforeAll(() => {
    companyDto = new CompanyDto(financialTestData);
  });
  describe("dto", () => {
    it("dtoを作ること", () => {
      const dto = companyDto.dto();
      expect(dto).toBeDefined();
      expect(dto.code).toEqual(financialTestData.information.code);
      expect(dto.name).toEqual(financialTestData.information.companyName);
    });
  });
});
