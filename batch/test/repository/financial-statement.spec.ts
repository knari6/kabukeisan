import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";
import { DBHelper } from "../helper/db-helper";
import { financialTestData } from "../dto/financial-data";
import { Decimal } from "@prisma/client/runtime/library";

describe.sequential("FinancialStatementRepository", () => {
  let prismaClient: PrismaClient;
  let prismaService: PrismaService;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let financialStatement: {
    id: number;
    companyId: number;
    fiscalYear: string;
    quarterType: string;
    stockAmount: Decimal;
    createdAt: Date;
    updatedAt: Date;
  } | null;

  beforeEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp();
  });
  afterEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp();
  });
  describe.sequential("write", async () => {
    beforeEach(async () => {
      prismaClient = new PrismaClient();
      companyRepository = new CompanyRepository(
        prismaClient,
        financialTestData
      );
      await companyRepository.write();
      prismaClient = new PrismaClient();
      financialStatementRepository = new FinancialStatementRpository(
        prismaClient,
        financialTestData,
        financialTestData.information.year,
        financialTestData.information.quarterType
      );
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

    test.sequential("データを登録できること", () => {
      expect(financialStatement?.fiscalYear).toBe(
        financialTestData.information.year
      );
      expect(financialStatement?.quarterType).toBe(
        financialTestData.information.quarterType
      );
      expect(Number(financialStatement?.stockAmount)).toBe(
        financialTestData.stockInfo.stockAmount
      );
    });
  });
});
