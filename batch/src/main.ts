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
  const startDate = new Date(
    parseInt(dateFrom.substring(0, 4), 10),
    parseInt(dateFrom.substring(4, 6), 10) - 1,
    parseInt(dateFrom.substring(6, 8), 10)
  );
  const endDate = new Date(
    parseInt(dateTo.substring(0, 4), 10),
    parseInt(dateTo.substring(4, 6), 10) - 1,
    parseInt(dateTo.substring(6, 8), 10)
  );
  for await (const currentDate of dateRange(startDate, endDate)) {
    for await (const { docID, fiscalYear } of getDocumentIds(
      currentDate,
      apiKey
    )) {
      if (!fiscalYear) {
        console.log("fiscalYear not found");
        continue;
      }
      try {
        const financialData = await parseXbrl(docID, fiscalYear, apiKey);
        await writeFinancialData(financialData);
      } catch (error) {
        console.error(error);
        continue;
      }
    }
  }
}

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

async function parseXbrl(
  docID: string,
  fiscalYear: string,
  apiKey: string
): Promise<FinancialData> {
  const xbrlFileData = await edinet.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
  const data = await parse.xbrl(docID + "/XBRL/PublicDoc");

  return finance.extractFinancialStatements(data, fiscalYear);
}

async function writeFinancialData(financialData: FinancialData) {
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

  await companyRepository.write().then(async () => {
    await financialStatementRepository.write().then(async () => {
      await balanceSheetRepository.write();
      await profitLossStatementRepository.write();
      await cashFlowRepository.write();
      await capitalExpenditureRepository.write();
      await debtRepository.write();
    });
  });
}

execute();
