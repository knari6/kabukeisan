// import { afterEach, beforeEach, describe, expect, it } from "vitest";
// import { PrismaService } from "../../src/services/prisma.service";
// import { CompanyFactory } from "./company-factory";
// import { FinancialStatementFactory } from "./financial-statement-factory";
// import { BalanceSheetFactory } from "./balance-sheet-factory";
// import { DBHelper } from "../helper/db-helper";
// import {
//   BalanceSheet,
//   Companies,
//   FinancialStatements,
//   Prisma,
// } from "@prisma/client";
// import { Random } from "../../src/libs/random";

// describe("BalanceSheetFactory", () => {
//   const prismaService = new PrismaService();
//   const companyFactory = new CompanyFactory(prismaService);
//   const financialStatementFactory = new FinancialStatementFactory(
//     prismaService
//   );
//   const balanceSheetFactory = new BalanceSheetFactory(prismaService);

//   describe("create", () => {
//     let balanceSheet: BalanceSheet | null;
//     const random = new Random();
//     afterEach(async () => {
//       await prismaService.onModuleDestroy();
//       await new DBHelper(prismaService).cleanUp();
//     });
//     describe("パラメータがある時", () => {
//       let balanceSheetParameter: Prisma.BalanceSheetCreateInput;
//       let company: Companies;
//       let financialStatement: FinancialStatements;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementFactory.create({
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

//         balanceSheetParameter = BalanceSheetFactory.build({
//           statement: {
//             connect: {
//               id: createdStatement.id,
//             },
//           },
//         });
//         await balanceSheetFactory.create(balanceSheetParameter);

//         balanceSheet = await prismaService.balanceSheet.findFirst({
//           where: {
//             statementId: createdStatement.id,
//           },
//         });
//       });
//       it("指定した内容で登録されること", () => {
//         expect(balanceSheet?.assets.toString()).toBe(
//           balanceSheetParameter.assets.toString()
//         );
//         expect(balanceSheet?.currentAssets.toString()).toBe(
//           balanceSheetParameter.currentAssets.toString()
//         );
//         expect(balanceSheet?.cashAndDeposits.toString()).toBe(
//           balanceSheetParameter.cashAndDeposits.toString()
//         );
//         expect(balanceSheet?.accountsReceivable.toString()).toBe(
//           balanceSheetParameter.accountsReceivable.toString()
//         );
//         expect(balanceSheet?.merchandiseAndFinishedGoods.toString()).toBe(
//           balanceSheetParameter.merchandiseAndFinishedGoods.toString()
//         );
//         expect(balanceSheet?.securities.toString()).toBe(
//           balanceSheetParameter.securities.toString()
//         );
//         expect(balanceSheet?.inventory.toString()).toBe(
//           balanceSheetParameter.inventory.toString()
//         );
//         expect(balanceSheet?.otherCurrentAssets.toString()).toBe(
//           balanceSheetParameter.otherCurrentAssets.toString()
//         );
//         expect(balanceSheet?.fixedAssets.toString()).toBe(
//           balanceSheetParameter.fixedAssets.toString()
//         );
//         expect(balanceSheet?.tangibleFixedAssets.toString()).toBe(
//           balanceSheetParameter.tangibleFixedAssets.toString()
//         );
//         expect(balanceSheet?.land.toString()).toBe(
//           balanceSheetParameter.land.toString()
//         );
//         expect(balanceSheet?.intangibleFixedAssets.toString()).toBe(
//           balanceSheetParameter.intangibleFixedAssets.toString()
//         );
//         expect(balanceSheet?.investmentSecurities.toString()).toBe(
//           balanceSheetParameter.investmentSecurities.toString()
//         );
//         expect(balanceSheet?.other.toString()).toBe(
//           balanceSheetParameter.other.toString()
//         );
//       });
//     });
//     describe("パラメータがない時", () => {
//       let company: Companies;
//       let financialStatement: FinancialStatements;
//       let balanceSheet: BalanceSheet;

//       beforeEach(async () => {
//         company = await companyFactory.create({
//           name: "テスト会社",
//           code: `${random.randomInt(1000, 9999)}`,
//         });

//         financialStatement = await financialStatementFactory.create({
//           company: {
//             connect: {
//               id: company.id,
//             },
//           },
//         });

//         balanceSheet = await balanceSheetFactory.create({
//           statement: {
//             connect: {
//               id: financialStatement.id,
//             },
//           },
//         });
//       });
//       it("ランダムな値で登録されること", () => {
//         expect(balanceSheet?.assets.toString()).not.toBeNull();
//       });
//     });
//   });
// });
