import { File } from "./libs/file";
import { Parse } from "./libs/parse";
import { Api } from "./libs/api";
import dotenv from "dotenv";
import { Finance } from "./libs/finance";
import { DateUtil } from "./libs/date";
import { PrismaClient } from "@prisma/client";
import { FinancialData } from "./libs/interfaces";
import { CompanyRepository } from "./repository/company";
import { BalanceSheetRepository } from "./repository/balance-sheet";
import { ProfitLossStatementRepository } from "./repository/profit-loss-statement";
import { CashFlowRepository } from "./repository/cash-flow";
import { CapitalExpenditureRepository } from "./repository/capital-expenditure";
import { DebtRepository } from "./repository/debt";
import fs from "fs";
import { XbrlClient } from "./libs/xbrl";
dotenv.config();

const dateFrom = process.argv[2];
const dateTo = process.argv[3];
const apiKey = process.argv[4];

const api = new Api();
const file = new File();
const parse = new Parse();
const finance = new Finance();
const prismaClient = new PrismaClient();
const xbrl = new XbrlClient(file, api, parse, finance);

async function execute() {
  const startDate = DateUtil.argToDate(dateFrom);
  const endDate = DateUtil.argToDate(dateTo);

  for await (const currentDate of DateUtil.dateRange(startDate, endDate)) {
    for await (const { docID, fiscalYear } of getDocumentIds(
      currentDate,
      apiKey
    )) {
      if (!fiscalYear) {
        console.log(`${docID}のデータがありません`);
        deleteDir(docID);
        continue;
      }
      try {
        const financialData = await xbrl.parseXbrl(docID, fiscalYear, apiKey);
        await writeFinancialData(financialData, docID);
        await deleteDir(docID);
      } catch (error) {
        console.error(error);
        deleteDir(docID);
        continue;
      }
    }
  }
}

/**
 * 通期の報告書のIDと決算期のリストを取得する
 * @param date
 * @param apiKey
 */
async function* getDocumentIds(date: Date, apiKey: string) {
  const results = await api.fetchList(
    DateUtil.getYYYYMMDDWithHyphens(date),
    apiKey
  );

  if (results?.documentIdList) {
    for (const docID of results.documentIdList) {
      yield docID;
    }
  }
}

/**
 * 四半期報告書のIDと決算期のリストを取得する
 * @param date
 * @param apiKey
 */
async function* getQuarterlyDocumentIds(date: Date, apiKey: string) {
  const results = await api.fetchList(
    DateUtil.getYYYYMMDDWithHyphens(date),
    apiKey
  );
  if (results?.quarterlyDocumentIdList) {
    for (const docID of results.quarterlyDocumentIdList) {
      yield docID;
    }
  }
}

async function fetchDocument(docID: string, apiKey: string) {
  const xbrlFileData = await api.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
}

/** 解凍したフォルダの削除 */
async function deleteDir(docID: string) {
  fs.rmSync(docID, { recursive: true, force: true });
}

async function writeFinancialData(
  financialData: FinancialData,
  docID: string
): Promise<void> {
  const companyRepository = new CompanyRepository(prismaClient, financialData);
  const balanceSheetRepository = new BalanceSheetRepository(
    prismaClient,
    financialData
  );
  const profitLossStatementRepository = new ProfitLossStatementRepository(
    prismaClient,
    financialData,
    financialData.information.year,
    financialData.information.quarterType
  );
  const cashFlowRepository = new CashFlowRepository(
    prismaClient,
    financialData
  );
  const capitalExpenditureRepository = new CapitalExpenditureRepository(
    prismaClient,
    financialData
  );
  const debtRepository = new DebtRepository(prismaClient, financialData);

  const isExist = await prismaClient.companies.findFirst({
    where: {
      code: financialData.information.code,
    },
  });
  if (isExist) {
    console.log("--------------------------------------");
    console.log(`データはすでに登録済みです`);
    console.log(
      `銘柄コード:${financialData.information.code}\n会社名:${financialData.information.companyName}\n`
    );
    console.log("--------------------------------------");
    return;
  }
  await companyRepository
    .write()
    .then(async () => {
      await balanceSheetRepository.write();
      await profitLossStatementRepository.write();
      await cashFlowRepository.write();
      await capitalExpenditureRepository.write();
      await debtRepository.write();
    })
    .then(async () => {
      console.log("--------------------------------------");
      console.log("データを保存しました");
      console.log(
        `銘柄コード:${financialData.information.code}\n会社名:${financialData.information.companyName}\n`
      );
      console.log("--------------------------------------");
    })
    .catch((error) => {
      console.log("--------------------------------------");
      console.log(`銘柄コード:${financialData.information.code}`);
      console.log(`会社名:${financialData.information.companyName}`);
      console.error("データを保存できませんでした");
      deleteDir(docID);
      console.error(error);
      fs.appendFileSync(
        "failed-code.txt",
        "----------------------\n" +
          `${financialData.information.code}:${financialData.information.companyName}:${financialData.information.year}:${financialData.information.quarterType}\n` +
          `${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}` +
          "\n----------------------\n"
      );

      console.log("--------------------------------------");
    });
}

execute();
