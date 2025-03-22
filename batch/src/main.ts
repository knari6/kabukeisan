import { File } from "./libs/file";
import { Parse } from "./libs/parse";
import { Api } from "./libs/api";
import dotenv from "dotenv";
import { Finance } from "./libs/finance";
import { DateUtil } from "./libs/date";
import { PrismaClient } from "@prisma/client";
import { LogClient } from "./libs/log";
import { FinanceService } from "./services/finance.service";
dotenv.config();

const dateFrom = process.argv[2];
const dateTo = process.argv[3];
const apiKey = process.argv[4];

const api = new Api();
const file = new File();
const parse = new Parse();
const finance = new Finance();
const prismaClient = new PrismaClient();
const log = new LogClient();

async function execute() {
  const startDate = DateUtil.argToDate(dateFrom);
  const endDate = DateUtil.argToDate(dateTo);

  for await (const currentDate of DateUtil.dateRange(startDate, endDate)) {
    for await (const { docID, fiscalYear } of api.getDocumentIds(
      currentDate,
      apiKey
    )) {
      if (!fiscalYear) {
        console.log(`${docID}のデータがありません`);
        file.deleteDir(docID);
        continue;
      }
      try {
        const bufferData = await api.fetchDocument(docID, apiKey);
        file.zipFile(bufferData, docID);
        file.unzipFile(docID);
        const parsedData = await parse.xbrl(docID + "/XBRL/PublicDoc");

        const financialData = finance.extractFinancialStatements(
          parsedData,
          fiscalYear,
          docID
        );
        const financeService = new FinanceService(prismaClient, financialData);
        await financeService.create();
        await file.deleteDir(docID);
      } catch (error) {
        console.error(error);
        file.deleteDir(docID);
        continue;
      }
    }
  }
}

execute();
