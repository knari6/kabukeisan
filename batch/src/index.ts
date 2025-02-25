import { File } from "./libs/file";
import { Parse } from "./libs/parse";
import { Api } from "./edinet/api";
import dotenv from "dotenv";
import { Finance } from "./libs/finance";
import { inspect } from "util";
import { Utils } from "./libs/utils";
import { DateUtil } from "./libs/date";

dotenv.config();

const edinet = new Api();
const file = new File();
const parse = new Parse();
const finance = new Finance();
const utils = new Utils();

const dateFrom = process.argv[2];
const dateTo = process.argv[3];
const apiKey = process.argv[4];
async function execute() {
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

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const results = await edinet.fetchList(
      DateUtil.getYYYYMMDDWithHyphens(currentDate),
      apiKey
    );
    console.log(results?.documentIdList);
    // if (results?.documentIdList) {
    //   for (const docID of results.documentIdList) {
    //     await parseXbrl(docID);
    //   }
    // }
    console.log(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

async function parseXbrl(docID: string, apiKey: string) {
  const xbrlFileData = await edinet.fetchDocument(docID, apiKey);
  file.zipFile(xbrlFileData, docID);
  file.unzipFile(docID);
  const data = await parse.xbrl(docID + "/XBRL/PublicDoc");
  // const data = await parse.xbrl(path);
  const financialStatements = finance.extractFinancialStatements(data, "2024");
  console.log(
    inspect(financialStatements, {
      depth: null,
      colors: true,
      maxArrayLength: null,
      compact: false,
      breakLength: 80,
    })
  );
}

// const startTime = performance.now();
// execute().then(() => {
//   const endTime = performance.now();
//   console.log(`Execution time: ${endTime - startTime} milliseconds`);
//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`Memory usage: ${used} MB`);
// });

parseXbrl("S100TA0D", apiKey);
