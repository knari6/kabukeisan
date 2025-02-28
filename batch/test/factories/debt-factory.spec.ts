import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { DebtFactory } from "./debt-factory";
import {
  Companies,
  DebtStatements,
  FinancialStatements,
  Prisma,
} from "@prisma/client";
import { DBHelper } from "../helper/db-helper";
import { Random } from "../../src/libs/random";
import { CompanyFactory } from "./company-factory";
import { FinancialStatementFactory } from "./financial-statement-factory";

describe("DebtFactory", () => {
  const prismaService = new PrismaService();
  const companyFactory = new CompanyFactory(prismaService);
  const financialStatementFactory = new FinancialStatementFactory(
    prismaService
  );
  const debtFactory = new DebtFactory(prismaService);

  afterAll(async () => {
    await prismaService.onModuleDestroy();
    await new DBHelper(prismaService).cleanUp();
  });

  describe("create", () => {
    let debt: DebtStatements | null;
    let company: Companies;
    const random = new Random();

    describe("パラメータがある時", () => {
      let debtParameter: Prisma.DebtStatementsCreateInput;
      let company: Companies;
      let financialStatement: FinancialStatements;

      beforeEach(async () => {
        // 会社を作成
        company = await companyFactory.create({
          name: "テスト会社",
          code: "1234",
        });

        // 財務諸表を作成
        financialStatement = await financialStatementFactory.create({
          company: {
            connect: {
              id: company.id,
            },
          },
        });

        const createdStatement =
          await prismaService.financialStatements.findUnique({
            where: { id: financialStatement.id },
          });

        if (!createdStatement) {
          throw new Error("財務諸表が作成できませんでした");
        }

        // 負債情報のパラメータを設定
        debtParameter = DebtFactory.build({
          statement: {
            connect: {
              id: financialStatement.id,
            },
          },
        });

        // 負債情報を作成
        await debtFactory.create(debtParameter);

        // 作成された負債情報を取得
        debt = await prismaService.debtStatements.findFirst({
          where: {
            statementId: financialStatement.id,
          },
        });
      });
      it("指定した内容で登録されること", async () => {
        expect(debt?.interestBearingDebt.toString()).toBe(
          debtParameter.interestBearingDebt.toString()
        );
      });
    });

    describe("パラメータがない時", () => {
      let company: Companies;
      let financialStatement: FinancialStatements;

      beforeEach(async () => {
        company = await companyFactory.create({
          name: "テスト会社",
          code: `${random.randomInt(1000, 9999)}`, // ここでもランダムなコードを使用
        });

        financialStatement = await financialStatementFactory.create({
          company: {
            connect: {
              id: company.id,
            },
          },
        });
      });
      it("ランダムな内容で登録されること", async () => {
        expect(debt?.interestBearingDebt.toString()).not.toBeNull();
      });
    });
  });
});
