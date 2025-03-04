import { PrismaClient } from "@prisma/client";
import { DepriciationDto } from "../dto/depreciation";
import { FinancialData } from "../libs/interfaces";

export class DepriciationRepository {
  private readonly prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async write(data: FinancialData) {
    const depreciataionDto = new DepriciationDto(data);
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
    const depreciation = depreciataionDto.dto(statement.id);
    await this.prismaClient.capitalExpenditure.create({
      data: depreciation,
    });
  }
}
