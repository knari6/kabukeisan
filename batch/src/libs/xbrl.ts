import * as fs from "fs";
import * as path from "path";

import dotenv from "dotenv";
import { FinancialData } from "./interfaces";
import { File } from "./file";
import { Api } from "./api";
import { Parse } from "./parse";
import { Finance } from "./finance";

dotenv.config();

export class XbrlClient {
  private readonly file: File;
  private readonly api: Api;
  private readonly parse: Parse;
  private readonly finance: Finance;
  constructor(file: File, api: Api, parse: Parse, finance: Finance) {
    this.file = file;
    this.api = api;
    this.finance = finance;
    this.parse = parse;
  }
  /**
   * 取得したxbrlファイルをダウンロードしてzipを解凍
   * 解凍したらログを出力
   * @param docID
   * @param fiscalYear
   * @param apiKey
   * @returns
   */
  public async parseXbrl(
    docID: string,
    fiscalYear: string,
    apiKey: string
  ): Promise<FinancialData> {
    const xbrlFileData = await this.api.fetchDocument(docID, apiKey);
    this.file.zipFile(xbrlFileData, docID);
    this.file.unzipFile(docID);
    const data = await this.parse.xbrl(docID + "/XBRL/PublicDoc");

    return this.finance.extractFinancialStatements(data, fiscalYear, docID);
  }
}
