import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { DocumentListResponse } from "../../src/libs/interfaces";
import { DOCUMENT_TYPE } from "../../src/libs/constants";
import { Api } from "../../src/edinet/api";
import dotenv from "dotenv";

dotenv.config();
vi.mock("axios");

describe("edinet", () => {
  describe("fetch", () => {
    it("書類一覧APIを呼び出せること", async () => {
      const mockResponse: DocumentListResponse = {
        metadata: {
          title: "test",
          parameter: {
            date: "2024-01-01",
            type: DOCUMENT_TYPE.DOCUMENT_DATA,
          },
          resultset: {
            count: 0,
          },
          processDateTime: "2024-01-01T00:00:00Z",
          status: "200",
          message: "OK",
        },
        results: [
          {
            seqNumber: 98,
            docID: "S100S8AQ",
            edinetCode: "E12441",
            secCode: null,
            JCN: "3010001062358",
            filerName: "ＳＢＩ岡三アセットマネジメント株式会社",
            fundCode: "G13529",
            ordinanceCode: "030",
            formCode: "04A000",
            docTypeCode: "030",
            periodStart: null,
            periodEnd: null,
            submitDateTime: "2024-01-10 09:19",
            docDescription: "有価証券届出書（内国投資信託受益証券）",
            issuerEdinetCode: null,
            subjectEdinetCode: null,
            subsidiaryEdinetCode: null,
            currentReportReason: null,
            parentDocID: null,
            opeDateTime: null,
            withdrawalStatus: "0",
            docInfoEditStatus: "0",
            disclosureStatus: "0",
            xbrlFlag: "1",
            pdfFlag: "1",
            attachDocFlag: "1",
            englishDocFlag: "0",
            csvFlag: "1",
            legalStatus: "1",
          },
        ],
      };
      (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockResponse,
      });
      const edinet = new Api();
      const result = await edinet.fetchList(
        "2024-01-09",
        DOCUMENT_TYPE.DOCUMENT_DATA
      );
      const url = "https://api.edinet-fsa.go.jp/api/v2/documents.json";
      const params = {
        date: "2024-01-09",
        type: DOCUMENT_TYPE.DOCUMENT_DATA,
        "Subscription-Key": "2",
      };

      await edinet.fetchList("2024-01-09", DOCUMENT_TYPE.DOCUMENT_DATA);
      expect(axios.get).toHaveBeenCalledWith(url, { params });
    });
  });
});
