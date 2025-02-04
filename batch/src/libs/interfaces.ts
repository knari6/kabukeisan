import { DOCUMENT_TYPE } from "./constants";

export interface DocumentListResponse {
  /** メタデータ
   * * メタデータの識別子です。
   */
  metadata: DocumentListResponseMetaData;
  /**
   * 提出書類一覧
   * * 提出書類一覧の識別子です。
   */
  results: DocumentListResponseResult[];
}

export interface DocumentIdList {
  /** 有価証券報告書 */
  documentIdList: string[];
  /** 四半期報告書 */
  quarterlyDocumentIdList: string[];
}

/** メタデータ */
export interface DocumentListResponseMetaData {
  /**
   * タイトル
   * * APIの名称が出力されます
   */
  title: string;
  /**
   * パラメータ
   * * リクエストパラメータの識別子です。
   */
  parameter: Omit<DocumentListRequest, "Subscription-Key">;
  /**
   * 結果セット
   * * 結果セットの識別子です。
   */
  resultset: {
    /**
     * カウント
     * * 指定したファイル日付における提出書類一覧の件数が出力されます。
     */
    count: number;
  };
  /**
   * 処理日時
   * * 提出書類一覧の更新時間が出力されます。提出書類一覧の内容に変更がない場合でも書類一覧更新日時は更新されます。
   */
  processDateTime: string;
  /**
   * ステータス
   * * 「3-3 ステータスコード」に記載のステータスが出力されます（リクエスト成功時は「200」）。
   */
  status: string;
  /**
   * メッセージ
   * * 「3-3 ステータスコード」に記載のメッセージが出力されます（リクエスト成功時は「OK」）。
   */
  message: string;
}

/** 提出書類一覧 */
export interface DocumentListResponseResult {
  /**
   * 連番
   * * ファイル日付ごとの連番です。詳細は「注意 提出書類一覧の連番について」を参照してください。
   */
  seqNumber: number;
  /** 書類管理番号
   * * 書類管理番号が出力されます。
   */
  docID: string;
  /** 提出者EDINETコード
   * * 提出者のEDINETコードが出力されます。
   */
  edinetCode: string;
  /** 提出者証券コード
   * * 提出者の証券コードが出力されます。
   */
  secCode: string | null;
  /** 提出者法人番号
   * * 提出者の法人番号が出力されます。
   */
  JCN: string;
  /** 提出者名
   * * 提出者の名称が出力されます。
   */
  filerName: string;
  /** ファンドコード
   * * ファンドコードが出力されます。
   */
  fundCode: string;
  /** 府令コード
   * * 府令コードが出力されます。
   */
  ordinanceCode: string;
  /** 様式コード
   * * 様式コードが出力されます。
   */
  formCode: string;
  /** 書類種別コード
   * * 書類種別コードが出力されます。
   */
  docTypeCode: string;
  /** 期間(自)
   * * 期間（自）が出力されます。
   */
  periodStart: string | null;
  /** 期間(至)
   * * 期間（至）が出力されます。
   */
  periodEnd: string | null;
  /** 提出日時
   * * 提出日時が出力されます。
   */
  submitDateTime: string;
  /** 提出書類概要
   * * EDINET の閲覧サイトの書類検索結果画面において、「提出書類」欄に表示される文字列が出力されます。
   */
  docDescription: string;
  /** 発行会社EDINETコード
   * * 大量保有について発行会社のEDINET コードが出力されます。
   */
  issuerEdinetCode: string | null;
  /** 対象EDINETコード
   * * 公開買付けについて対象となるEDINET コードが出力されます。
   */
  subjectEdinetCode: string | null;
  /** 子会社EDINETコード
   * * 子会社の EDINET コードが出力されます。複数存在する場合（最大 10個）、","（カンマ）で結合した文字列が出力されます。
   */
  subsidiaryEdinetCode: string | null;
  /** 臨報提出事由
   * * 臨時報告書の提出事由が出力されます。複数存在する場合、","（カンマ）で結合した文字列が出力されます。
   */
  currentReportReason: string | null;
  /** 親書類管理番号
   * * 親書類管理番号が出力されます。
   */
  parentDocID: string | null;
  /** 操作日時
   * * 磁気ディスク提出及び紙面提出を行った日時が出力されます。
   */
  opeDateTime: "1" | "2" | "0" | null;
  /** 取下区分
   * * 取下書は"1"、取り下げられた書類は"2"、それ以外は"0"が出力されます。
   */
  withdrawalStatus: "1" | "2" | "0";
  /** 書類情報修正区分
   * * 財務局職員が書類を修正した情報は"1"、修正された書類は"2"、それ以外は"0"が出力されます。
   */
  docInfoEditStatus: "1" | "2" | "0";
  /** 開示不開示区分
   * * 財務局職員によって書類の不開示を開始した情報は"1"、不開示とされている書類は"2"、財務局職員によって書類の不開示を解除した情報は"3"、それ以外は"0"が出力されます。
   */
  disclosureStatus: "1" | "2" | "3" | "0";
  /** XBRL有無フラグ
   * * 書類に XBRL がある場合は"1"、それ以外は"0"が出力されます。
   */
  xbrlFlag: "0" | "1";
  /** PDF有無フラグ
   * * 書類に PDF がある場合は"1"、それ以外は"0"が出力されます。
   */
  pdfFlag: "0" | "1";
  /** 添付書類有無フラグ
   * * 書類に代替書面・添付文書がある場合は"1"、それ以外は"0"が出力されます。
   */
  attachDocFlag: "0" | "1";
  /** 英語書類有無フラグ
   * * 書類に英文ファイルがある場合は"1"、それ以外は"0"が出力されます。
   */
  englishDocFlag: "0" | "1";
  /** CSV有無フラグ
   * * 書類に CSV ファイルがある場合は"1"、それ以外は"0"が出力されます。
   */
  csvFlag: "0" | "1";
  /** 縦覧区分
   * * "1"：縦覧中
   * * "2"：延長期間中（法定縦覧期間満了書類だが引き続き閲覧可能。）
   * * "0"：閲覧期間満了（縦覧期間満了かつ延長期間なし、延長期間満了又は取下げにより閲覧できないもの。なお、不開示は含まない。）
   */
  legalStatus: "1" | "2" | "0";
}

/** EDINET 書類取得APIの呼び出しのリクエストパラメータ */
export interface DocumentListRequest {
  /** 日付 */
  date: string;
  /** タイプ */
  type: typeof DOCUMENT_TYPE.DOCUMENT_DATA;
  /** サブスクリプションキー */
  "Subscription-Key": string;
}

export interface FinancialStatement {
  /** 貸借対照表 */
  balanceSheet: BalanceSheet;
  /** 損益計算書 */
  incomeStatement: IncomeStatement;
  /** キャッシュフロー計算書 */
  cashFlowStatement: CashFlowStatement;
  /** 設備投資・減価償却費・研究開発費 */
  capitalAndRDExpenses: CapitalAndRDExpenses;
  /** 株式情報 */
  stockInfo: StockInfo;
  /** メタデータ */
  metadata: Metadata;
}

/** 株式情報 */
export interface StockInfo {
  /** 株式発行総数 */
  stockAmount: number;
}

/** 貸借対照表 */
export interface BalanceSheet {
  /** 資産 */
  assets: {
    /** 流動資産 */
    currentAssets: number;
    /** 現金預金 */
    cashAndDeposits: number;
    /** 売上債権 */
    accountsReceivable: number;
    /** 製品 */
    merchandiseAndFinishedGoods: number;
    /** 有価証券 */
    securities: number;
    /** 棚卸資産 */
    inventory: number;
    /** その他 */
    otherCurrentAssets: number;
    /** 固定資産 */
    fixedAssets: number;
    /** 有形固定資産 */
    tangibleFixedAssets: number;
    /** 土地 */
    land: number;
    /** 無形固定資産 */
    intangibleFixedAssets: number;
    /** 投資その他有価証券 */
    investmentSecurities: number;
    /** その他 */
    other: number;
    /** 資産合計 */
    asset: number;
  };
  /** 負債 */
  liabilities: {
    /** 流動負債 */
    currentLiabilities: number;
    /** 借入債務 */
    debt: number;
    /** その他流動負債 */
    otherCurrentLiabilities: number;
    /** 固定負債 */
    fixedLiabilities: number;
    /** その他 */
    other: number;
    /** 負債合計 */
    liability: number;
  };
  /** 純資産 */
  netAssets: {
    /** 純資産合計 */
    total: number;
    /** 自己資本 */
    equity: number;
  };
}

/** 損益計算書 */
export interface IncomeStatement {
  /** 売上高 */
  netSales: number;
  /** 売上原価 */
  costOfSales: number;
  /** 営業利益 */
  operatingIncome: number;
  /** 経常利益 */
  ordinaryIncome: number;
  /** 税引前利益 */
  incomeBeforeIncomeTaxes: number;
  /** 法人税等合計 */
  tax: number;
  /** 当期純利益 */
  profitLoss: number;
}

/** キャッシュフロー計算書 */
export interface CashFlowStatement {
  /** 営業活動によるキャッシュの流入 */
  netCashProvidedByOperatingActivities: number;
  /** 投資活動によるキャッシュの流入 */
  netCashProvidedByInvestingActivities: number;
  /** 財務活動によるキャッシュの流入 */
  netCashProvidedByFinancingActivities: number;
  /** 現金同等物 */
  cashAndCashEquivalents: number;
}

/** 設備投資・減価償却費・研究開発費 */
export interface CapitalAndRDExpenses {
  /** 減価償却費 */
  depreciation: number;
  /** 無形固定資産の償却 */
  amortization: number;
  /** 設備投資 */
  equipmentInvestment: number;
  /** 研究開発費 */
  researchAndDevelopmentExpenses: number;
}

/** 有利子負債など */
export interface InterestBearingLiabilities {
  /** 総資産 */
  /** 自己資本 */
  /** 有利子負債 */
}

export interface Metadata {
  /** ファンド名 */
  companyName: string;
  /** 提出日 */
  filingDate: string;
  /** 計算期間 */
  fiscalPeriod: string;
  /** 四半期 */
  quarter: string;
}
