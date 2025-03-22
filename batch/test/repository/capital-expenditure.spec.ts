import { CapitalExpenditure, PrismaClient } from "@prisma/client";
import {
  describe,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  test,
} from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { CapitalExpenditureRepository } from "../../src/repository/capital-expenditure";
import { financialTestData } from "../dto/financial-data";

describe("CapitalExpenditureRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let depreciationRepository: CapitalExpenditureRepository;

  let depreciation: Partial<CapitalExpenditure> | null;

  beforeAll(() => {
    prismaClient = new PrismaClient();
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe.sequential("write", async () => {
    beforeEach(async () => {
      prismaClient = new PrismaClient();
      companyRepository = new CompanyRepository(
        prismaClient,
        financialTestData
      );

      depreciationRepository = new CapitalExpenditureRepository(
        prismaClient,
        financialTestData
      );
      await companyRepository.write();
      await depreciationRepository.write();
      depreciation = await prismaClient.capitalExpenditure.findFirst({
        where: {
          company: {
            code: financialTestData.information.code,
            fiscalYear: financialTestData.information.year,
            quarterType: financialTestData.information.quarterType,
          },
        },
      });
    });

    test.sequential("DBにデータを登録できること", async () => {
      expect(depreciation).not.toBeNull();
    });
  });
});
