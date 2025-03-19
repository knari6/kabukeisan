import * as fs from "fs";
import * as xml2js from "xml2js";

export class Parse {
  constructor() {}

  /**
   * xbrlファイルをパースする
   * @param directory
   * @returns
   */
  public async xbrl(directory: string) {
    try {
      // ディレクトリ内の.xbrlファイルを検索（withFileTypesオプションを使用）
      const dirents = fs.readdirSync(directory, { withFileTypes: true });
      const files = dirents.filter((dirent) => dirent.name.endsWith(".xbrl"));

      if (files.length === 0) {
        throw new Error(".xbrlファイルが見つかりませんでした");
      }

      // 最初の.xbrlファイルを読み込む
      const xbrlFile = await fs.promises.readFile(
        `${directory}/${files[0].name}`,
        "utf-8"
      );

      // XMLを先にパースする
      const parser = new xml2js.Parser({ explicitArray: true });
      return await parser.parseStringPromise(xbrlFile);
    } catch (error) {
      console.error("XBRLファイルの解析中にエラーが発生しました:", error);
      console.error("詳細なエラー情報:", JSON.stringify(error, null, 2));
      throw error;
    }
  }
}
