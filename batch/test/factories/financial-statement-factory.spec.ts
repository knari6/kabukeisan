import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { DBHelper } from "../helper/db-helper";
import { PrismaService } from "../../src/services/prisma.service";
import { FinancialStatements, Prisma, Companies } from "@prisma/client";
import { FinancialStatementFactory } from "./financial-statement-factory";
import { CompanyFactory } from "./company-factory";
import { Random } from "../../src/libs/random";

describe("FinancialStatementFactory", () => {
  const prismaService = new PrismaService();
  const factory = new FinancialStatementFactory(prismaService);
  beforeEach(async () => {
    await new DBHelper(prismaService).cleanUp();
    await prismaService.onModuleDestroy();
  });
  afterAll(async () => {
    await new DBHelper(prismaService).cleanUp();
  });
  describe("create", async () => {
    let financialStatement: FinancialStatements | null;
    let company: Companies;

    describe("パラメータがあるとき", async () => {
      let company: Companies;
      let parameter: Prisma.FinancialStatementsCreateInput;

      beforeEach(async () => {
        company = await new CompanyFactory(prismaService).create({});
        const createdCompany = await prismaService.companies.findFirst({
          where: {
            id: company.id,
          },
        });

        console.log(createdCompany?.id);

        parameter = FinancialStatementFactory.build({
          company: {
            connect: {
              id: company.id,
            },
          },
        });
        financialStatement = await factory.create({
          company: {
            connect: {
              id: company.id,
            },
          },
        });
      });
      it("指定した内容で登録されること", () => {
        expect(financialStatement?.fiscalYear).toBe(parameter.fiscalYear);
        expect(financialStatement?.quarterType).toBe(parameter.quarterType);
        expect(financialStatement?.stockAmount.toString()).toBe(
          parameter.stockAmount.toString()
        );
      });
    });

    describe("パラメータがないとき", async () => {
      beforeEach(async () => {
        const random = new Random();
        company = await new CompanyFactory(prismaService).create({
          name: "test",
        });

        financialStatement = await factory.create({
          company: {
            connect: {
              id: company.id,
            },
          },
        });
      });

      it("randomな値で登録されること", () => {
        expect(financialStatement).not.toBeNull();
      });
    });
  });
});
