import { Companies, PrismaClient } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { financialTestData } from "../dto/financial-data";

describe("CompanyRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let company: Partial<Companies> | null;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe("write", () => {
    beforeAll(async () => {
      await companyRepository.write();
      company = await prismaClient.companies.findFirst({
        where: {
          code: financialTestData.information.code,
        },
        select: {
          name: true,
          code: true,
        },
      });
    });

    test("データベースに登録できること", () => {
      expect(company?.code).toBe(financialTestData.information.code);
      expect(company?.name).toBe(financialTestData.information.companyName);
      expect(company?.fiscalYear).toBe(financialTestData.information.year);
    });
  });
});
