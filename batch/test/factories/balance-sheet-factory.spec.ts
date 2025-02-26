import { afterAll, describe } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";
import { BalanceSheetFactory } from "./balance-sheet-factory";
import { DBHelper } from "../helper/db-helper";
describe("BalanceSheetFactory", () => {
  const prismaService = new PrismaService();
  const factory = new BalanceSheetFactory(prismaService);

  afterAll(async () => {
    await prismaService.onModuleDestroy();
    await new DBHelper(prismaService).cleanUp();
  });

  describe("create", () => {});
});
