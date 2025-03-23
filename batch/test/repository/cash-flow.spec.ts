import { afterAll, beforeEach, describe, expect, test } from "vitest";
import { CashFlowRepository } from "../../src/repository/cash-flow";
import { CashFlow, PrismaClient } from "@prisma/client";
import { financialTestData } from "../dto/financial-data";
import { CompanyRepository } from "../../src/repository/company";

import { Decimal } from "@prisma/client/runtime/library";

describe.sequential("CashFlowRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let cashFlowRepository: CashFlowRepository;
  let statement: { id: number } | null;
  let cashFlow: Partial<CashFlow> | null;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
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
      cashFlowRepository = new CashFlowRepository(
        prismaClient,
        financialTestData
      );
      await companyRepository.write();

      statement = await prismaClient.companies.findFirst({
        where: {
          code: financialTestData.information.code,
          fiscalYear: financialTestData.information.year,
          quarterType: financialTestData.information.quarterType,
        },
        select: {
          id: true,
          fiscalYear: true,
          quarterType: true,
        },
      });
      await cashFlowRepository.write();

      cashFlow = await prismaClient.cashFlow.findFirst({
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
      expect(cashFlow).not.toBeNull();
      expect(Number(cashFlow?.operatingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByOperatingActivity
      );
      expect(Number(cashFlow?.investingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByInvestingActivity
      );
      expect(Number(cashFlow?.financingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByFinancingActivity
      );
      expect(Number(cashFlow?.dividendPaid)).toBe(
        financialTestData.cashFlowStatement.dividendsPaid
      );
      expect(Number(cashFlow?.cashAndCashEquivalent)).toBe(
        financialTestData.cashFlowStatement.cashAndCashEquivalent
      );
    });
  });
});
