// import { afterAll, beforeEach, describe, it } from "vitest";
// import { CompanyFactory } from "./company-factory";
// import { FinancialStatementFactory } from "./financial-statement-factory";
// import { PrismaService } from "../../src/services/prisma.service";
// import { CapitalExpenditureFactory } from "./capital-expenditure-facrory";
// import { afterEach } from "node:test";
// import { DBHelper } from "../helper/db-helper";
// import {
//   CapitalExpenditure,
//   Companies,
//   FinancialStatements,
//   Prisma,
// } from "@prisma/client";
// import { Random } from "../../src/libs/random";

// describe("CapitalExpenditureFactory", () => {
//   const prismaService: PrismaService = new PrismaService();
//   const companyFactory = new CompanyFactory(prismaService);
//   const financialStatementsFactory = new FinancialStatementFactory(
//     prismaService
//   );
//   const capitalExpenditureFactory = new CapitalExpenditureFactory(
//     prismaService
//   );

//   describe("create", () => {
//     let capitalExpenditure: CapitalExpenditure | null;
//     const random = new Random();
//     afterEach(async () => {
//       await prismaService.capitalExpenditure.deleteMany();
//       await new DBHelper(prismaService).cleanUp();
//     });
//     describe("パラメータがある時", () => {
//       let capitalExpenditureParameter: Prisma.CapitalExpenditureCreateInput;
//       let company: Companies;
//       let financialStatement: FinancialStatements;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementsFactory.create({
//           company: {
//             connect: {
//               id: company.id,
//             },
//           },
//         });

//         const createdStatement =
//           await prismaService.financialStatements.findUnique({
//             where: { id: financialStatement.id },
//           });

//         if (!createdStatement) {
//           throw new Error("財務諸表が作成できませんでした");
//         }

//         capitalExpenditureParameter = CapitalExpenditureFactory.build({
//           statement: {
//             connect: {
//               id: createdStatement.id,
//             },
//           },
//         });

//         await capitalExpenditureFactory.create(capitalExpenditureParameter);

//         capitalExpenditure = await prismaService.capitalExpenditure.findFirst({
//           where: {
//             statementId: createdStatement.id,
//           },
//         });

//         if (!capitalExpenditure) {
//           throw new Error("資本的支出が作成できませんでした");
//         }
//       });
//       it("指定した内容で登録されること", () => {});
//     });
//     describe("パラメータがない時", () => {
//       let company: Companies;
//       let financialStatement: FinancialStatements;
//       let capitalExpenditure: CapitalExpenditure;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementsFactory.create({
//           company: {
//             connect: {
//               id: company.id,
//             },
//           },
//         });

//         capitalExpenditure = await capitalExpenditureFactory.create({
//           statement: {
//             connect: {
//               id: financialStatement.id,
//             },
//           },
//         });
//       });
//       it("ランダムな値で登録されること", () => {});
//     });
//   });
// });
