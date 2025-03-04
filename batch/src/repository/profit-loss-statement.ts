import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { ProfitLossStatementDto } from "../dto/profit-loss-statement";

export class ProfitLossStatementRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async write(data: FinancialData) {
    const profitLossStatementDto = new ProfitLossStatementDto(data);
    const statement = await this.prismaClient.financialStatements.findFirst({
      where: {
        companyId: Number(data.information.code),
        fiscalYear: data.information.year,
        quarterType: data.information.quarterType,
      },
      select: {
        id: true,
      },
    });
    if (!statement) {
      throw new Error("Statement not found");
    }
    const profitLossStatement = profitLossStatementDto.dto(statement.id);
    await this.prismaClient.profitLossStatements.create({
      data: profitLossStatement,
    });
  }
}
