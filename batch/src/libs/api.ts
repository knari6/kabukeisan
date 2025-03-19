import axios from "axios";
import { DOCUMENT_TYPE } from "./constants";
import {
  DocumentIdList,
  DocumentListRequest,
  DocumentListResponseResult,
} from "./interfaces";

/**
 * EDINET APIを呼び出すだけのクラス
 */
export class Api {
  private readonly apiKey = process.env.EDINET_API_KEY || "";
  private readonly domain = "https://api.edinet-fsa.go.jp/api/v2/";

  /**
   * * 3-1. EDINET 書類取得APIの呼び出し
   * * DateUtilのgetYYYYMMDDWithHyphensを使う
   * @param date string(YYYY-MM-DD)
   * @returns DocumentListResponse | void
   */
  public async fetchList(
    date: string,
    apiKey: string
  ): Promise<DocumentIdList | void> {
    console.log("fetchList", date, apiKey);
    const param: DocumentListRequest = {
      date,
      type: DOCUMENT_TYPE.DOCUMENT_DATA,
      "Subscription-Key": apiKey,
    };
    try {
      const response = await axios.get(this.domain + "documents.json", {
        params: param,
      });
      if (!response.data.results) {
        return { documentIdList: [], quarterlyDocumentIdList: [] };
      }
      const regex = new RegExp(/^有価証券報告書－第\d+期/);
      const quarterlyRegex = new RegExp(/^四半期報告書－第\d+/);
      /** 有価証券報告書と四半期報告書のデータを取得する */
      const documentIdList = [
        ...this.filterDocuments(response?.data.results, regex),
      ];
      const quarterlyDocumentIdList = [
        ...this.filterDocuments(response.data.results, quarterlyRegex),
      ];
      return {
        documentIdList: documentIdList.map((item) => ({
          docID: item.docID,
          fiscalYear: item.fiscalYear || "",
        })),
        quarterlyDocumentIdList: quarterlyDocumentIdList.map((item) => ({
          docID: item.docID,
          fiscalYear: item.fiscalYear || "",
        })),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * * 3-1. EDINET 書類取得APIの呼び出し
   * * DateUtilのgetYYYYMMDDWithHyphensを使う
   * @param docID 書類管理番号
   * @returns DocumentListResponse | void
   */
  public async fetchDocument(docID: string, apiKey: string): Promise<Buffer> {
    const params = {
      type: 1,
      "Subscription-Key": apiKey,
    };
    try {
      const response = await axios.get(this.domain + "documents/" + docID, {
        params,
        responseType: "arraybuffer", // レスポンスをバイナリとして取得
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * パターンにマッチする書類IDを返す
   * @param documents DocumentListResponseResult[]
   * @param pattern RegExp
   * @returns Generator<string>
   */
  private *filterDocuments(
    documents: DocumentListResponseResult[],
    pattern: RegExp
  ) {
    for (const item of documents) {
      if (pattern.test(item.docDescription)) {
        yield { docID: item.docID, fiscalYear: item.periodEnd };
      }
    }
  }
}
