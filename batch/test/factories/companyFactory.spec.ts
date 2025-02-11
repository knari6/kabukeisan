import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { CompanyFactory } from "./companyFactory";
import { Companies, Prisma } from "@prisma/client";
import { DBHelper } from "../helper/db-helper";

describe("CompanyFactory", () => {
  const prismaService = new PrismaService();
  const factory = new CompanyFactory(prismaService);

  afterAll(async () => {
    await prismaService.onModuleDestroy();
  });

  beforeEach(async () => {
    await new DBHelper(prismaService).cleanUp();
  });
  afterAll(async () => {
    await new DBHelper(prismaService).cleanUp();
  });
  describe("create", () => {
    let company: Companies | null;

    describe("パラメータがあるとき", () => {
      let parameter: Prisma.CompaniesCreateInput;
      beforeEach(async () => {
        parameter = CompanyFactory.build();
        await factory.create(parameter);
        company = await prismaService.companies.findFirst({
          where: { code: parameter.code, year: parameter.year },
        });
      });

      it("指定した内容で登録されること", () => {
        expect(company?.code.toString()).toBe(parameter.code.toString());
        expect(company?.name).toBe(parameter.name);
        expect(company?.year).toBe(parameter.year);
        expect(company?.created_at.toString()).toBe(
          parameter.created_at?.toString()
        );
        expect(company?.updated_at.toString()).toBe(
          parameter.updated_at?.toString()
        );
      });
    });
    describe("パラメータがないとき", () => {
      beforeEach(async () => {
        await factory.create({});
        company = await prismaService.companies.findFirst({
          orderBy: { id: Prisma.SortOrder.desc },
        });
      });

      it("randomな値で登録されること", () => {
        expect(company).not.toBeNull();
        expect(company?.code.toString()).not.toBeNull();
        expect(company?.name).not.toBeNull();
        expect(company?.year).not.toBeNull();
        expect(company?.created_at).not.toBeNull();
        expect(company?.updated_at).not.toBeNull();
      });
    });
  });
});
