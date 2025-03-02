import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { CompanyFactory } from "./company-factory";
import { Companies, Prisma } from "@prisma/client";
import { DBHelper } from "../helper/db-helper";

describe("CompanyFactory", () => {
  const prismaService = new PrismaService();
  const factory = new CompanyFactory(prismaService);
  beforeEach(async () => {
    await new DBHelper(prismaService).cleanUp("");
    await prismaService.onModuleDestroy();
  });
  afterAll(async () => {
    await new DBHelper(prismaService).cleanUp("");
  });
  describe("create", () => {
    let company: Companies | null;

    describe("パラメータがあるとき", async () => {
      let parameter: Prisma.CompaniesCreateInput;
      beforeEach(async () => {
        parameter = CompanyFactory.build();
        await factory.create(parameter);
        company = await prismaService.companies.findFirst({
          where: { code: parameter.code },
        });
      });

      it("指定した内容で登録されること", () => {
        expect(company?.code.toString()).toBe(parameter.code.toString());
        expect(company?.name).toBe(parameter.name);
        expect(company?.createdAt.toString()).toBe(
          parameter.createdAt?.toString()
        );
        expect(company?.updatedAt.toString()).toBe(
          parameter.updatedAt?.toString()
        );
      });
    });
    describe("パラメータがないとき", async () => {
      beforeEach(async () => {
        await factory.create({ name: "company" });
        company = await prismaService.companies.findFirst({
          orderBy: { id: Prisma.SortOrder.desc },
        });
      });

      it("randomな値で登録されること", () => {
        expect(company).not.toBeNull();
        expect(company?.code.toString()).not.toBeNull();
        expect(company?.name).not.toBeNull();

        expect(company?.createdAt).not.toBeNull();
        expect(company?.updatedAt).not.toBeNull();
      });
    });
  });
});
