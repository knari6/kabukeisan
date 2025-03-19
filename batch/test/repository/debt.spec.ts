import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { Companies, Debt, PrismaClient } from "@prisma/client";
import { CompanyRepository } from "../../src/repository/company";
import { DebtRepository } from "../../src/repository/debt";
import { financialTestData } from "../dto/financial-data";

describe.sequential("DebtRepository", () => {
  let prismaClient: PrismaClient;
  let companyRepository: CompanyRepository;
  let debtRepository: DebtRepository;

  let company: Partial<Companies> | null;
  let debt: Partial<Debt> | null;

  beforeEach(async () => {
    // 新しいPrismaClientインスタンスを作成
    prismaClient = new PrismaClient();

    // リポジトリの初期化
    companyRepository = new CompanyRepository(prismaClient, financialTestData);
    debtRepository = new DebtRepository(prismaClient, financialTestData);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe("write", () => {
    beforeEach(async () => {
      // トランザクション内でデータを作成
      await prismaClient.$transaction(async (tx) => {
        // 会社を作成
        await companyRepository.write();

        // 会社が作成されたことを確認
        company = await prismaClient.companies.findFirst({
          where: { code: financialTestData.information.code },
        });
        if (!company) throw new Error("Company not created");

        // 財務諸表が作成されたことを確認
        await debtRepository.write();
        // 作成された負債情報を取得
        debt = await prismaClient.debt.findFirst({
          where: { companyId: company.id },
          select: { id: true, interestBearingDebt: true },
        });
      });
    });

    it("DBにデータを登録できること", () => {
      expect(debt).not.toBeNull();
      expect(Number(debt?.interestBearingDebt)).toBe(
        financialTestData.balanceSheet.liabilities.debt
      );
    });
  });
});
