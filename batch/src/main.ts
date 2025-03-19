import { File } from "./libs/file";
import { Parse } from "./libs/parse";
import { Api } from "./edinet/api";
import dotenv from "dotenv";
import { Finance } from "./libs/finance";
import { DateUtil } from "./libs/date";
import { PrismaClient } from "@prisma/client";
import { FinancialData } from "./libs/interfaces";
import { CompanyRepository } from "./repository/company";
import { FinancialStatementRpository } from "./repository/financial-statement";
import { BalanceSheetRepository } from "./repository/balance-sheet";
import { ProfitLossStatementRepository } from "./repository/profit-loss-statement";
import { CashFlowRepository } from "./repository/cash-flow";
import { CapitalExpenditureRepository } from "./repository/capital-expenditure";
import { DebtRepository } from "./repository/debt";
import fs from "fs";
dotenv.config();

const edinet = new Api();
const file = new File();
const parse = new Parse();
const finance = new Finance();
const prismaClient = new PrismaClient();

const dateFrom = process.argv[2];
const dateTo = process.argv[3];

async function execute() {
  // .envファイルの読み込みを確認
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const apiKey = process.argv[4];
  const startDate = DateUtil.argToDate(dateFrom);
  const endDate = DateUtil.argToDate(dateTo);

  for await (const currentDate of dateRange(startDate, endDate)) {
    for await (const { docID, fiscalYear } of getDocumentIds(
      currentDate,
      apiKey
    )) {
      if (!fiscalYear) {
        console.log(`${docID}のデータがありません`);
        console.log("fiscalYear not found");
        continue;
      }
      try {
        const financialData = await parseXbrl(docID, fiscalYear, apiKey);
        await writeFinancialData(financialData, docID);
        await deleteDir(docID);
      } catch (error) {
        console.error(error);
        continue;
      }
    }
  }
}

/**
 * 毎日日付を指定するため
 * @param startDate
 * @param endDate
 */
async function* dateRange(startDate: Date, endDate: Date) {
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    yield currentDate;
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

/**
 * 通期の報告書のIDと決算期のリストを取得する
 * @param date
 * @param apiKey
 */
async function* getDocumentIds(date: Date, apiKey: string) {
  const results = await edinet.fetchList(
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
  const results = await edinet.fetchList(
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
  const xbrlFileData = await edinet.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
}

/**
 * 取得したxbrlファイルをダウンロードしてzipを解凍
 * 解凍したらログを出力
 * @param docID
 * @param fiscalYear
 * @param apiKey
 * @returns
 */
async function parseXbrl(
  docID: string,
  fiscalYear: string,
  apiKey: string
): Promise<FinancialData> {
  const xbrlFileData = await edinet.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
  const data = await parse.xbrl(docID + "/XBRL/PublicDoc");

  return finance.extractFinancialStatements(data, fiscalYear, docID);
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
  const financialStatementRepository = new FinancialStatementRpository(
    prismaClient,
    financialData,
    financialData.information.year,
    financialData.information.quarterType
  );
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
      financialStatements: {
        some: {
          fiscalYear: financialData.information.year,
          quarterType: financialData.information.quarterType,
        },
      },
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
  await companyRepository.write();
  await financialStatementRepository
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
      console.error(error);
      fs.appendFileSync(
        "failed-code.txt",
        `${financialData.information.code}:${financialData.information.companyName}:${financialData.information.year}:${financialData.information.quarterType}\n`
      );
      console.log("--------------------------------------");
    });
}

execute();
