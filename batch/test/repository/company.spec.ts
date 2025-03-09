import { PrismaClient } from "@prisma/client";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { PrismaService } from "../../src/services/prisma.service";
import { DBHelper } from "../helper/db-helper";
import { financialTestData } from "../dto/financial-data";

describe.sequential("CompanyRepository", () => {
  let prismaClient: PrismaClient;
  let prismaService: PrismaService;
  let companyRepository: CompanyRepository;
  let company: { name: string; code: string } | null;

  afterEach(async () => {
    await prismaClient.$disconnect();
  });
  describe.sequential("write", async () => {
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
    test.sequential("データベースに登録できること", () => {
      expect(company?.code).toBe(financialTestData.information.code);
      expect(company?.name).toBe(financialTestData.information.companyName);
    });
  });
});
