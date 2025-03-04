import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { DebtDto } from "../dto/debt";

export class DebtRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async write(data: FinancialData) {
    const debtDto = new DebtDto(data);
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
    const debt = debtDto.dto(statement.id);
    await this.prismaClient.debtStatements.create({
      data: debt,
    });
  }
}
