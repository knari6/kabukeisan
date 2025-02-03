import * as fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { File } from "../../src/libs/file";

vi.mock("fs");
vi.mock("adm-zip");

describe("File", () => {
  let file: File;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    file = new File();
    vi.clearAllMocks();
    consoleLogSpy = vi.spyOn(console, "log");
    consoleErrorSpy = vi.spyOn(console, "error");
    // AdmZipのモックを設定
    vi.mocked(AdmZip).mockImplementation(
      () =>
        ({
          getEntries: vi.fn(),
        } as any)
    );

    vi.spyOn(fs, "unlinkSync").mockImplementation(() => undefined);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("zipFile", () => {
    it("バッファーデータをZIPファイルとして保存できること", () => {
      /** Bufferのテストデータ */
      const testData = Buffer.from("テストデータ");
      /** ファイルパス */
      const filepathName = "test-file";
      /** zipファイルのパス */
      const expectedPath = path.join("/tmp", "test-file.zip");

      // getEntriesのモックを保持
      const getEntriesMock = vi.fn();
      vi.mocked(AdmZip).mockImplementation(
        () =>
          ({
            getEntries: getEntriesMock,
          } as any)
      );

      // メソッドの実行
      file.zipFile(testData, filepathName);

      // 検証
      expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, testData);
      expect(AdmZip).toHaveBeenCalledWith(expectedPath);
      expect(getEntriesMock).toHaveBeenCalled();
    });

    it("エラー時に例外が投げられること", () => {
      // テストデータの準備
      const testData = Buffer.from("テストデータ");
      const filepathName = "test-file";
      // writeFileSyncでエラーを発生させる
      vi.mocked(fs.writeFileSync).mockImplementation(() => {
        throw new Error("書き込みエラー");
      });

      // メソッドの実行と検証
      expect(() => file.zipFile(testData, filepathName)).toThrow(
        "書き込みエラー"
      );
    });
  });
  describe("unzipFile", () => {
    it("ファイルが正常に解凍されること", () => {
      const extractAllToMock = vi.fn();
      const filepathName = "test-file";
      const expectedPath = path.join(".", filepathName);
      vi.mocked(AdmZip).mockImplementation(
        () =>
          ({
            extractAllTo: extractAllToMock,
          } as any)
      );

      // メソッドの実行
      file.unzipFile(filepathName);

      // 検証
      expect(extractAllToMock).toHaveBeenCalledWith(expectedPath, true);
    });

    it("エラー時に例外が投げられること", () => {
      const filepathName = "test-file";
      vi.mocked(AdmZip).mockImplementation(() => {
        throw new Error("解凍エラー");
      });

      // メソッドの実行と検証
      expect(() => file.unzipFile(filepathName)).toThrow("解凍エラー");
    });
  });
  describe("renameFile", () => {
    it("ファイルが正常にリネームされること", () => {
      const filepathName = "test-file";
      const expectedPath = path.join(".", filepathName);
      file.renameFile(filepathName);
      expect(fs.readdirSync).toHaveBeenCalledWith(expectedPath);
    });

    it("エラー時に例外が投げられること", () => {
      const filepathName = "test-file";
      vi.mocked(fs.readdirSync).mockImplementation(() => {
        throw new Error("リネームエラー");
      });
      expect(() => file.renameFile(filepathName)).toThrow("リネームエラー");
    });
  });
  describe("deleteFile", () => {
    it("ファイルが正常に削除されること", () => {
      const filepathName = "test-file";
      const expectedPath = path.join("/tmp", filepathName + ".zip");
      file.deleteFile(filepathName);
      expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
      expect(console.log).toHaveBeenCalledWith(
        `${filepathName}のファイルが正常に削除されました`
      );
    });

    it("ファイル削除でエラーが発生した場合、エラーがログ出力されること", () => {
      // Arrange
      vi.mocked(fs.unlinkSync).mockImplementation(() => {
        throw new Error("ファイルの削除中にエラーが発生しました");
      });

      // Act
      file.deleteFile("test-file");

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "ファイルの削除中にエラーが発生しました"
      );
    });
  });
});
