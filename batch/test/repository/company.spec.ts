import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { PrismaService } from "../../src/services/prisma.service";
import { DBHelper } from "../helper/db-helper";
import { financialTestData } from "../dto/financial-data";

describe("CompanyRepository", () => {
  let prismaClient: PrismaClient;
  let prismaService: PrismaService;
  let companyRepository: CompanyRepository;
  let company: { name: string; code: string } | null;

  beforeEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp();
  });
  afterEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp();
  });
  describe("write", async () => {
    prismaClient = new PrismaClient();
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
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
    it("データベースに登録できること", () => {
      expect(company?.code).toBe(financialTestData.information.code);
      expect(company?.name).toBe(financialTestData.information.companyName);
    });
  });
});
