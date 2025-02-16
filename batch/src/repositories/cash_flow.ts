import { PrismaClient } from "@prisma/client";
import { CashFlowDto } from "../dto/cash_flow";
import { FinancialData } from "../libs/interfaces";

export class CashFlowRepository {
  private readonly prismaClient: PrismaClient;
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  public async write(data: FinancialData) {
    const cashFlowDto = new CashFlowDto();
    const cashFlow = cashFlowDto.dto(data);
  }
}
