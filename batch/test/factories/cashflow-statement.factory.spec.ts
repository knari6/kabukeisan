// import { CashflowStatementFactory } from "./cashflow-statement.factory";
// import { PrismaService } from "../../src/services/prisma.service";
// import { DBHelper } from "../helper/db-helper";
// import { afterEach, beforeEach, describe, expect, it } from "vitest";
// import {
//   CashFlowStatement,
//   Companies,
//   FinancialStatements,
//   Prisma,
// } from "@prisma/client";
// import { Random } from "../../src/libs/random";
// import { FinancialStatementFactory } from "./financial-statement-factory";
// import { CompanyFactory } from "./company-factory";
// import { a } from "vitest/dist/chunks/suite.B2jumIFP";

// describe("CashflowStatementFactory", () => {
//   const prismaService = new PrismaService();
//   const companyFactory = new CompanyFactory(prismaService);
//   const financialStatementFactory = new FinancialStatementFactory(
//     prismaService
//   );
//   const cashflowStatementFactory = new CashflowStatementFactory(prismaService);

//   describe("create", () => {
//     let cashflowStatement: CashFlowStatement | null;
//     const random = new Random();
//     afterEach(async () => {
//       await prismaService.onModuleDestroy();
//       await new DBHelper(prismaService).cleanUp();
//     });
//     describe("パラメータがある時", () => {
//       let cashflowStatementParameter: Prisma.CashFlowStatementCreateInput;
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

//         cashflowStatementParameter = CashflowStatementFactory.build({
//           statement: {
//             connect: { id: createdStatement.id },
//           },
//         });

//         await cashflowStatementFactory.create(cashflowStatementParameter);

//         cashflowStatement = await prismaService.cashFlowStatement.findFirst({
//           where: {
//             statementId: financialStatement.id,
//           },
//         });
//       });
//       it("指定した内容で登録されること", () => {
//         expect(cashflowStatement?.operatingCashFlow.toString()).toBe(
//           cashflowStatementParameter.operatingCashFlow.toString()
//         );
//       });
//     });
//     describe("パラメータがない時", () => {
//       let company: Companies;
//       let financialStatement: FinancialStatements;
//       let cashflowStatement: CashFlowStatement;

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

//         cashflowStatement = await cashflowStatementFactory.create({
//           statement: {
//             connect: { id: financialStatement.id },
//           },
//         });
//       });
//       it("ランダムな値で登録されること", () => {
//         expect(cashflowStatement).not.toBeNull();
//       });
//     });
//   });
// });

// //   describe("create", () => {
// //     let cashflowStatement: CashFlowStatement | null;
// //     const random = new Random();

// //     afterEach(async () => {
// //       await prismaService.onModuleDestroy();
// //       await new DBHelper(prismaService).cleanUp();
// //     });
// //     describe("パラメータがある時", () => {
// //       let cashflowStatementParameter: Prisma.CashFlowStatementCreateInput;
// //       let company: Companies;
// //       let financialStatement: FinancialStatements;

// //       beforeEach(async () => {
// //         company = await companyFactory.create({
// //           name: "テスト会社",
// //           code: `${random.randomInt(1000, 9999)}`,
// //         });

// //         financialStatement = await financialStatementFactory.create({
// //           company: {
// //             connect: { id: company.id },
// //           },
// //         });

// //         const createdStatement =
// //           await prismaService.financialStatements.findUnique({
// //             where: { id: financialStatement.id },
// //           });

// //         if (!createdStatement) {
// //           throw new Error("財務諸表が作成できませんでした");
// //         }

// //         cashflowStatementParameter = CashflowStatementFactory.build({
// //           statement: {
// //             connect: { id: createdStatement.id },
// //           },
// //         });

// //         await cashflowStatementFactory.create(cashflowStatementParameter);

// //         cashflowStatement = await prismaService.cashFlowStatement.findUnique({
// //           where: { statementId: createdStatement.id },
// //         });
// //       });
// //       it("指定した内容で登録されること", () => {
// //         expect(cashflowStatement?.operatingCashFlow.toString()).toBe(
// //           cashflowStatementParameter.operatingCashFlow.toString()
// //         );
// //         expect(cashflowStatement?.investingCashFlow.toString()).toBe(
// //           cashflowStatementParameter.investingCashFlow.toString()
// //         );
// //         expect(cashflowStatement?.financingCashFlow.toString()).toBe(
// //           cashflowStatementParameter.financingCashFlow.toString()
// //         );
// //         expect(cashflowStatement?.cashAndCashEquivalents.toString()).toBe(
// //           cashflowStatementParameter.cashAndCashEquivalents.toString()
// //         );
// //         expect(cashflowStatement?.devidendPaid.toString()).toBe(
// //           cashflowStatementParameter.devidendPaid.toString()
// //         );
// //       });
// //     });
// //     describe("パラメータがない時", () => {
// //       let company: Companies;
// //       let financialStatement: FinancialStatements;
// //       let cashflowStatement: CashFlowStatement;

// //       beforeEach(async () => {
// //         company = await companyFactory.create({
// //           name: "テスト会社",
// //           code: `${random.randomInt(1000, 9999)}`,
// //         });

// //         financialStatement = await financialStatementFactory.create({
// //           company: {
// //             connect: { id: company.id },
// //           },
// //         });

// //         cashflowStatement = await cashflowStatementFactory.create({
// //           statement: {
// //             connect: { id: financialStatement.id },
// //           },
// //         });
// //       });
// //       it("ランダムな値で登録されること", () => {
// //         expect(cashflowStatement).not.toBeNull();
// //       });
// //     });
// //   });
// // });
