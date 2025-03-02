// import { PrismaService } from "../../src/services/prisma.service";
// import { DBHelper } from "../helper/db-helper";
// import { afterEach, beforeEach, describe, expect, it } from "vitest";
// import {
//   Companies,
//   FinancialStatements,
//   Prisma,
//   ProfitLossStatements,
// } from "@prisma/client";
// import { Random } from "../../src/libs/random";
// import { FinancialStatementFactory } from "./financial-statement-factory";
// import { CompanyFactory } from "./company-factory";
// import { ProfitStatementFactory } from "./profit-statement-factory";

// describe("ProfitStatementFactory", () => {
//   const prismaService = new PrismaService();
//   const companyFactory = new CompanyFactory(prismaService);
//   const financialStatementFactory = new FinancialStatementFactory(
//     prismaService
//   );
//   const profitStatementFactory = new ProfitStatementFactory(prismaService);

//   describe("create", () => {
//     let profitLossStatements: ProfitLossStatements | null;
//     const random = new Random();
//     afterEach(async () => {
//       await prismaService.onModuleDestroy();
//       await new DBHelper(prismaService).cleanUp();
//     });

//     describe("パラメータがある時", () => {
//       let profitStatementParameter: Prisma.ProfitLossStatementsCreateInput;
//       let company: Companies;
//       let financialStatement: FinancialStatements;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementFactory.create({
//           company: {
//             connect: { id: company.id },
//           },
//         });

//         const createdStatement =
//           await prismaService.financialStatements.findUnique({
//             where: { id: financialStatement.id },
//           });

//         if (!createdStatement) {
//           throw new Error("財務諸表が作成できませんでした");
//         }

//         profitStatementParameter = ProfitStatementFactory.build({
//           statement: {
//             connect: { id: createdStatement.id },
//           },
//         });

//         await profitStatementFactory.create(profitStatementParameter);

//         profitLossStatements =
//           await prismaService.profitLossStatements.findFirst({
//             where: {
//               statementId: financialStatement.id,
//             },
//           });
//       });
//       it("指定した内容で登録されること", () => {
//         expect(profitLossStatements?.sales.toString()).toBe(
//           profitStatementParameter.sales.toString()
//         );
//       });
//     });

//     describe("パラメータがない時", () => {
//       let company: Companies;
//       let financialStatement: FinancialStatements;
//       let profitStatement: ProfitLossStatements;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementFactory.create({
//           company: {
//             connect: { id: company.id },
//           },
//         });

//         profitStatement = await profitStatementFactory.create({
//           statement: {
//             connect: { id: financialStatement.id },
//           },
//         });
//       });
//       it("ランダムな値で登録されること", () => {
//         expect(profitStatement.sales).toBeGreaterThan(0);
//       });
//     });
//   });
// });
