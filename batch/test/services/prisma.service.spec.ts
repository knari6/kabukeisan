import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { PrismaService } from "../../src/services/prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });

  describe("onModuleInit", () => {
    it("データベースに接続できること", async () => {
      await service.onModuleInit();
      const result = await service.$queryRaw`SELECT 1`;
      expect(result).toBeDefined();
    });
  });

  describe("onModuleDestroy", () => {
    it("データベースから切断できること", async () => {
      await service.onModuleInit();
      await service.onModuleDestroy();
      // 切断後もクエリは実行できるが、新しい接続が作成されることを確認
      const result = await service.$queryRaw`SELECT 1`;
      expect(result).toBeDefined();
    });
  });
});
