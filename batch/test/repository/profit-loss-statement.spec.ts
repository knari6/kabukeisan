import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { Companies, PrismaClient, ProfitLoss } from "@prisma/client";
import { CompanyRepository } from "../../src/repository/company";
import { ProfitLossStatementRepository } from "../../src/repository/profit-loss-statement";

import { financialTestData } from "../dto/financial-data";

describe("ProfitLossStatementRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let profitLossStatementRepository: ProfitLossStatementRepository;
  let company: Partial<Companies> | null;
  let profitLossStatement: Partial<ProfitLoss> | null;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
  });

  beforeEach(() => {
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
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

      // 損益情報を作成
      await profitLossStatementRepository.write();

      // 損益情報を取得
      profitLossStatement = await prismaClient.profitLoss.findFirst({
        where: {
          company: {
            code: financialTestData.information.code,
            fiscalYear: financialTestData.information.year,
            quarterType: financialTestData.information.quarterType,
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
      expect(Number(profitLossStatement?.sale)).toBe(
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
