import { PrismaClient } from "@prisma/client";
import { CashFlowDto } from "../dto/cash_flow";
import { FinancialData } from "../libs/interfaces";

export class CashFlowRepository {
  private readonly prismaClient: PrismaClient;
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  public async write(data: FinancialData) {
    const cashFlowDto = new CashFlowDto(data);
    const statement = await this.prismaClient.financialStatements.findFirst({
      where: {
        companyId: Number(data.information.code),
        year: data.information.year,
        quarterType: data.information.quarterType,
      },
      select: {
        id: true,
      },
    });
    if (!statement) {
      throw new Error("Statement not found");
    }
    const cashFlow = cashFlowDto.dto(statement.id);
    await this.prismaClient.cashFlows.create({
      data: cashFlow,
    });
  }
}
