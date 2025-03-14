import { PrismaClient } from "@prisma/client";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";
import { financialTestData } from "../dto/financial-data";
import { Decimal } from "@prisma/client/runtime/library";

describe("FinancialStatementRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let financialStatement: {
    id: number;
    companyId: number;
    fiscalYear: string;
    quarterType: string;
    stockAmounts: Decimal;
    createdAt: Date;
    updatedAt: Date;
  } | null;
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

  describe("write", async () => {
    beforeEach(async () => {
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
      });
    });

    test("データを登録できること", () => {
      expect(financialStatement?.fiscalYear).toBe(
        financialTestData.information.year
      );
      expect(financialStatement?.quarterType).toBe(
        financialTestData.information.quarterType
      );
      expect(Number(financialStatement?.stockAmounts)).toBe(
        financialTestData.stockInfo.stockAmount
      );
    });
  });
});
