import { PrismaService } from "../../src/services/prisma.service";

export class DBHelper {
  public constructor(private readonly prisma: PrismaService) {}
  public async cleanUp() {
    await this.prisma.accountDatas.deleteMany();
    await this.prisma.companies.deleteMany();
  }
}
