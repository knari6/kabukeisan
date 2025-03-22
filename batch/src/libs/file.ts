import path from "path";
import * as fs from "fs";
import AdmZip from "adm-zip";
/**
 * 	取得したデータをファイルに変換するクラス
 */
export class File {
  /**
   * ファイルをZIP化
   * @param data データ
   * @param filepathName ファイルパス
   */
  public zipFile(data: Buffer, filepathName: string): void {
    try {
      const filePath = path.join("/tmp", filepathName + ".zip");
      fs.writeFileSync(filePath, data);
      const zip = new AdmZip(filePath);
      zip.getEntries();
    } catch (error) {
      throw error;
    }
  }

  /**
   * ZIPファイルを解凍
   * @param docId 対象のdoc_id
   */
  public unzipFile(filepathName: string): void {
    const zipFilePath = path.join("/tmp", filepathName + ".zip");
    const extractPath = path.join(".", filepathName);
    const zip = new AdmZip(zipFilePath);

    try {
      zip.extractAllTo(extractPath, true);
      console.log(`${filepathName}のファイルが正常に解凍されました`);
    } catch (error) {
      console.error("ZIPファイルの解凍中にエラーが発生しました:", error);
    }
  }

  /**
   * 解凍されたファイルをリネーム（必要に応じて実装）
   * @param docId 対象のdoc_id
   */
  public renameFile(filepathName: string): void {
    const extractPath = path.join(".", filepathName);
    fs.readdirSync(extractPath);
  }

  /**
   * ファイルを削除
   * @param filepathName 対象のファイルパス
   */
  public deleteFile(filepathName: string): void {
    const filePath = path.join("/tmp", filepathName + ".zip");

    try {
      fs.unlinkSync(filePath);
      console.log(`${filepathName}のファイルが正常に削除されました`);
    } catch (error) {
      console.error("ファイルの削除中にエラーが発生しました");
    }
  }

  /** 解凍したフォルダの削除 */
  public deleteDir(docID: string) {
    fs.rmSync(docID, { recursive: true, force: true });
  }
}
