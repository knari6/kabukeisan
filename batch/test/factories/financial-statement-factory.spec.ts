// import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";
// import { DBHelper } from "../helper/db-helper";
// import { PrismaService } from "../../src/services/prisma.service";
// import { FinancialStatements, Prisma, Companies } from "@prisma/client";
// import { FinancialStatementFactory } from "./financial-statement-factory";
// import { CompanyFactory } from "./company-factory";
// import { Random } from "../../src/libs/random";

// describe("FinancialStatementFactory", () => {
//   const prismaService = new PrismaService();
//   const factory = new FinancialStatementFactory(prismaService);

//   describe("create", () => {
//     let financialStatement: FinancialStatements | null;
//     let company: Companies;
//     afterEach(async () => {
//       await prismaService.onModuleDestroy();
//       await new DBHelper(prismaService).cleanUp();
//     });
//     describe("パラメータがあるとき", () => {
//       let parameter: Prisma.FinancialStatementsCreateInput;

//       beforeEach(async () => {
//         company = await new CompanyFactory(prismaService).create({});
//         parameter = FinancialStatementFactory.build({
//           company: {
//             connect: {
//               id: company.id,
//             },
//           },
//         });
//         await factory.create(parameter);
//         financialStatement = await prismaService.financialStatements.findFirst({
//           where: {
//             fiscalYear: parameter.fiscalYear,
//             quarterType: parameter.quarterType,
//           },
//         });
//       });
//       it("指定した内容で登録されること", () => {
//         expect(financialStatement?.fiscalYear).toBe(parameter.fiscalYear);
//         expect(financialStatement?.quarterType).toBe(parameter.quarterType);
//         expect(financialStatement?.stockAmount.toString()).toBe(
//           parameter.stockAmount.toString()
//         );
//       });
//     });

//     describe("パラメータがないとき", () => {
//       beforeEach(async () => {
//         const random = new Random();
//         company = await new CompanyFactory(prismaService).create({
//           code: `${random.randomInt(1000, 9999)}`,
//           name: "test",
//         });

//         financialStatement = await factory.create({
//           company: {
//             connect: {
//               id: company.id,
//             },
//           },
//         });
//       });

//       it("randomな値で登録されること", () => {
//         expect(financialStatement).not.toBeNull();
//       });
//     });
//   });
// });
