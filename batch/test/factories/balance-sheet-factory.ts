import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../../src/libs/interfaces";

export class BalanceSheetFactory {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public static build() {}
  public async create(data: FinancialData) {}
}
