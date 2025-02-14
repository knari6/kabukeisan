import { File } from "./libs/file";
import { Parse } from "./libs/parse";
import { Api } from "./edinet/api";
import dotenv from "dotenv";
import { Finance } from "./libs/finance";
import { inspect } from "util";
import { DateUtil } from "./libs/date";
import { PrismaClient } from "@prisma/client";
import { AccountDataRepository } from "./repositories/account-data";
import { CompaniesRepository } from "./repositories/companies";

dotenv.config();

const edinet = new Api();
const file = new File();
const parse = new Parse();
const finance = new Finance();
const prismaClient = new PrismaClient();
const accountDataRepository = new AccountDataRepository(prismaClient);
const companiesRepository = new CompaniesRepository(prismaClient);
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
    for await (const docID of getDocumentIds(currentDate, apiKey)) {
      console.log(docID, currentDate);
      await parseXbrl(docID, apiKey);
    }
  }
  // console.log("--------------quarterly-----------------------------------");
  // for await (const currentDate of dateRange(startDate, endDate)) {
  //   for await (const docID of getQuarterlyDocumentIds(currentDate)) {
  //     console.log(docID);
  //   }
  // }
}

async function* dateRange(startDate: Date, endDate: Date) {
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    yield currentDate;
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

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

async function parseXbrl(docID: string, apiKey: string) {
  const xbrlFileData = await edinet.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
  const data = await parse.xbrl(docID + "/XBRL/PublicDoc");
  const financialStatements = finance.extractFinancialStatements(data);

  console.log(
    inspect(financialStatements, {
      depth: null,
      colors: true,
      maxArrayLength: null,
      compact: false,
      breakLength: 80,
    })
  );
  await companiesRepository.write(financialStatements);
  await accountDataRepository.write(financialStatements);
}

// const startTime = performance.now();
// execute().then(() => {
//   const endTime = performance.now();
//   console.log(`Execution time: ${endTime - startTime} milliseconds`);
//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`Memory usage: ${used} MB`);
// });
execute();
