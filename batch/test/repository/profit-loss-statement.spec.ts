import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import {
  Companies,
  FinancialStatements,
  PrismaClient,
  ProfitLossStatements,
} from "@prisma/client";
import { CompanyRepository } from "../../src/repository/company";
import { FinancialStatementRpository } from "../../src/repository/financial-statement";
import { ProfitLossStatementRepository } from "../../src/repository/profit-loss-statement";

import { financialTestData } from "../dto/financial-data";

describe("ProfitLossStatementRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let financialStatementRepository: FinancialStatementRpository;
  let profitLossStatementRepository: ProfitLossStatementRepository;
  let company: Partial<Companies> | null;
  let financialStatement: Partial<FinancialStatements> | null;
  let profitLossStatement: Partial<ProfitLossStatements> | null;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
  });

  beforeEach(() => {
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
    financialStatementRepository = new FinancialStatementRpository(
      prismaClient,
      financialTestData,
      financialTestData.information.year,
      financialTestData.information.quarterType
    );
    profitLossStatementRepository = new ProfitLossStatementRepository(
      prismaClient,
      financialTestData,
      financialTestData.information.year,
      financialTestData.information.quarterType
    );
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe("write", () => {
    beforeEach(async () => {
      await companyRepository.write();
      // 会社が作成されたことを確認
      company = await prismaClient.companies.findFirst({
        where: { code: financialTestData.information.code },
      });
      if (!company) throw new Error("Company not created");

      // 財務諸表を作成
      await financialStatementRepository.write();
      // 財務諸表が作成されたことを確認
      financialStatement = await prismaClient.financialStatements.findFirst({
        where: {
          company: { code: financialTestData.information.code },
          fiscalYear: financialTestData.information.year,
          quarterType: financialTestData.information.quarterType,
        },
      });
      if (!financialStatement)
        throw new Error("Financial statement not created");
      // 損益情報を作成
      await profitLossStatementRepository.write();

      // 損益情報を取得
      profitLossStatement = await prismaClient.profitLossStatements.findFirst({
        where: {
          statement: {
            company: {
              id: financialStatement.companyId,
            },
            // fiscalYear: financialTestData.information.year,
            // quarterType: financialTestData.information.quarterType,
          },
        },
      });
      // console.log(await prismaClient.profitLossStatements.findMany());
      if (!profitLossStatement)
        throw new Error("Profit loss statement not created");
      console.log("profitLossStatement", profitLossStatement);
    });
    it("should be defined", () => {
      expect(Number(profitLossStatement?.grossProfit)).toBe(
        financialTestData.incomeStatement.sales -
          financialTestData.incomeStatement.costOfSales
      );
      expect(Number(profitLossStatement?.sales)).toBe(
        financialTestData.incomeStatement.sales
      );
      expect(Number(profitLossStatement?.operatingProfit)).toBe(
        financialTestData.incomeStatement.operatingIncome
      );
      expect(Number(profitLossStatement?.ordinaryProfit)).toBe(
        financialTestData.incomeStatement.ordinaryIncome
      );
      expect(Number(profitLossStatement?.profitBeforeTax)).toBe(
        financialTestData.incomeStatement.incomeBeforeIncomeTaxes
      );
      expect(Number(profitLossStatement?.tax)).toBe(
        financialTestData.incomeStatement.tax
      );
      expect(Number(profitLossStatement?.netIncome)).toBe(
        financialTestData.incomeStatement.profitLoss
      );
    });
  });
});
