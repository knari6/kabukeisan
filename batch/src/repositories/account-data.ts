// import { PrismaClient } from "@prisma/client";
// import { FinancialData } from "../libs/interfaces";
// import { randomInt } from "crypto";
// import { AccountDataDto } from "../dto/account-data";

// export class AccountDataRepository {
//   private readonly prismaClient: PrismaClient;
//   constructor(prismaClient: PrismaClient) {
//     this.prismaClient = prismaClient;
//   }

//   public async write(data: FinancialData) {
//     const accountDataDto = new AccountDataDto();
//     const accountData = accountDataDto.dto(data);
//     await this.prismaClient.accountDatas.create({
//       data: accountData,
//     });
//   }
// }
