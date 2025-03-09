import { describe, it, beforeEach, expect, afterEach, test } from "vitest";
import { CashFlowRepository } from "../../src/repository/cash-flow";
import { PrismaClient } from "@prisma/client";
import { financialTestData } from "../dto/financial-data";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";

import { DBHelper } from "../helper/db-helper";
import { PrismaService } from "../../src/services/prisma.service";
import { Decimal } from "@prisma/client/runtime/library";

describe.sequential("CashFlowRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let cashFlowRepository: CashFlowRepository;
  let statement: { id: number } | null;
  let prismaService: PrismaService;
  let cashFlow: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    statementId: number;
    operatingCashFlow: Decimal;
    investingCashFlow: Decimal;
    financingCashFlow: Decimal;
    cashAndCashEquivalents: Decimal;
    devidendPaid: Decimal;
  } | null;

  beforeEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp("cashFlowStatement");
  });
  afterEach(async () => {
    prismaService = new PrismaService();
    await new DBHelper(prismaService).cleanUp("cashFlowStatement");
  });
  describe.sequential("write", async () => {
    beforeEach(async () => {
      prismaClient = new PrismaClient();
      cashFlowRepository = new CashFlowRepository(
        prismaClient,
        financialTestData
      );
      companyRepository = new CompanyRepository(
        prismaClient,
        financialTestData
      );
      await companyRepository.write();
      financialStatementRepository = new FinancialStatementRpository(
        prismaClient,
        financialTestData,
        financialTestData.information.year,
        financialTestData.information.quarterType
      );

      await financialStatementRepository.write();

      statement = await prismaClient.financialStatements.findFirst({
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
      await cashFlowRepository.write();

      cashFlow = await prismaClient.cashFlowStatement.findFirst({
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
    });

    test.sequential("DBにデータを登録できること", async () => {
      expect(cashFlow).not.toBeNull();
      expect(Number(cashFlow?.operatingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByOperatingActivities
      );
      expect(Number(cashFlow?.investingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByInvestingActivities
      );
      expect(Number(cashFlow?.financingCashFlow)).toBe(
        financialTestData.cashFlowStatement.netCashProvidedByFinancingActivities
      );
      expect(Number(cashFlow?.devidendPaid)).toBe(
        financialTestData.cashFlowStatement.dividendsPaid
      );
      expect(Number(cashFlow?.cashAndCashEquivalents)).toBe(
        financialTestData.cashFlowStatement.cashAndCashEquivalents
      );
    });
  });
});
