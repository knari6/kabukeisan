import { PrismaClient } from "@prisma/client";
import { FinancialData } from "../libs/interfaces";
import { DebtDto } from "../dto/debt";

export class DebtRepository {
  private readonly prismaClient: PrismaClient;
  private readonly data: FinancialData;
  constructor(prismaClient: PrismaClient, data: FinancialData) {
    this.prismaClient = prismaClient;
    this.data = data;
  }

  public async write() {
    const debtDto = new DebtDto(this.data);
    const statement = await this.prismaClient.financialStatements.findFirst({
      where: {
        companyId: Number(this.data.information.code),
        fiscalYear: this.data.information.year,
        quarterType: this.data.information.quarterType,
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
