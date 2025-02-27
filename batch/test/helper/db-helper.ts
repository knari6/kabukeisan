import { PrismaService } from "../../src/services/prisma.service";

export class DBHelper {
  public constructor(private readonly prisma: PrismaService) {}
  public async cleanUp() {
    // トランザクション内で削除を実行
    await this.prisma.$transaction(async (tx) => {
      // 最初に子テーブル（外部キーを持つテーブル）のデータを削除
      await tx.financialStatements.deleteMany();
      // その後、親テーブルのデータを削除
      await tx.companies.deleteMany();
    });
  }
}
