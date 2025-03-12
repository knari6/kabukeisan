import {
  FinancialStatements,
  PrismaClient,
  CapitalExpenditure,
} from "@prisma/client";
import {
  describe,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  test,
} from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";
import { CapitalExpenditureRepository } from "../../src/repository/capital-expenditure";
import { financialTestData } from "../dto/financial-data";

describe("CapitalExpenditureRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let depreciationRepository: CapitalExpenditureRepository;
  let financialStatement: Partial<FinancialStatements> | null;
  let depreciation: Partial<CapitalExpenditure> | null;

  beforeAll(() => {
    prismaClient = new PrismaClient();
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
    financialStatementRepository = new FinancialStatementRpository(
      prismaClient,
      financialTestData,
      financialTestData.information.year,
      financialTestData.information.quarterType
    );
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

      financialStatementRepository = new FinancialStatementRpository(
        prismaClient,
        financialTestData,
        financialTestData.information.year,
        financialTestData.information.quarterType
      );

      depreciationRepository = new CapitalExpenditureRepository(
        prismaClient,
        financialTestData
      );
      await companyRepository.write();
      await financialStatementRepository.write();
      financialStatement = await prismaClient.financialStatements.findFirst({
        where: {
          company: {
            code: financialTestData.information.code,
          },
          fiscalYear: financialTestData.information.year,
          quarterType: financialTestData.information.quarterType,
        },
        select: {
          id: true,
          fiscalYear: true,
          quarterType: true,
          companyId: true,
          company: true,
        },
      });
      await depreciationRepository.write();

      depreciation = await prismaClient.capitalExpenditure.findFirst({
        where: {
          statement: {
            company: {
              code: financialTestData.information.code,
            },
            fiscalYear: financialTestData.information.year,
            quarterType: financialTestData.information.quarterType,
          },
        },
      });
      console.log(depreciation);
    });

    test.sequential("DBにデータを登録できること", async () => {
      expect(depreciation).not.toBeNull();
    });
  });
});
