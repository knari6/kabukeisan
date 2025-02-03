import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import { Parse } from "../../src/libs/parse";
import * as fs from "fs";
import * as xml2js from "xml2js";

// fsモジュールのモックを正しく設定
vi.mock("fs", async () => {
  const actual = await vi.importActual("fs");
  return {
    ...actual,
    readdirSync: vi.fn().mockReturnValue([]),
    promises: {
      readFile: vi.fn(),
    },
  };
});

vi.mock("xml2js");

describe("Parse", () => {
  let parse: Parse;
  let mockFiles: fs.Dirent[];
  let errorFiles: fs.Dirent[];

  beforeEach(() => {
    parse = new Parse();
    mockFiles = [
      {
        name: "test.xbrl",
        isFile: () => true,
        isDirectory: () => false,
      } as fs.Dirent,
    ];
    errorFiles = [
      {
        name: "error.xbrl",
        isFile: () => true,
        isDirectory: () => false,
      } as fs.Dirent,
    ];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("xbrl", () => {
    it("正常系: XBRLファイルを正しくパースできること", async () => {
      const mockXbrlContent = "<xbrl>テストデータ</xbrl>";
      const mockParsedData = { xbrl: { データ: ["テスト"] } };
      const directory = "test/xbrl_files";

      // Direntオブジェクトの配列を作成
      const mockDirents: fs.Dirent[] = [
        {
          name: "test.xbrl",
          isFile: () => true,
          isDirectory: () => false,
        } as fs.Dirent,
      ];

      // withFileTypesオプションを含めてモックを設定
      vi.mocked(fs.readdirSync).mockImplementationOnce(
        (path, options) => mockDirents
      );
      vi.mocked(fs.promises.readFile).mockResolvedValueOnce(mockXbrlContent);

      // xml2jsのモック設定
      const mockParseStringPromise = vi
        .fn()
        .mockResolvedValueOnce(mockParsedData);
      const mockParser = { parseStringPromise: mockParseStringPromise };
      vi.spyOn(xml2js, "Parser").mockImplementation(() => mockParser as any);

      const result = await parse.xbrl(directory);

      expect(fs.readdirSync).toHaveBeenCalledWith(directory, {
        withFileTypes: true,
      });
      expect(fs.promises.readFile).toHaveBeenCalledWith(
        `${directory}/test.xbrl`,
        "utf-8"
      );
      expect(result).toEqual(mockParsedData);
    });

    it("XBRLファイルが存在しない場合はエラーを投げること", async () => {
      const directory = "test/xbrl_files";
      const emptyDirents: fs.Dirent[] = [];

      // console.errorをモック化
      vi.spyOn(console, "error").mockImplementation(() => {});

      // withFileTypesオプションを含めてモックを設定
      vi.mocked(fs.readdirSync).mockImplementationOnce(() => emptyDirents);

      // エラーが投げられることを期待
      await expect(async () => {
        await parse.xbrl(directory);
      }).rejects.toThrow(".xbrlファイルが見つかりませんでした");

      // console.errorが呼ばれたことを確認
      expect(console.error).toHaveBeenCalled();
    });

    it("ファイル読み込みエラー時にエラーを投げること", async () => {
      const directory = "test/xbrl_files";
      const mockError = new Error("ファイル読み込みエラー");

      vi.mocked(fs.readdirSync).mockReturnValueOnce(mockFiles);
      vi.mocked(fs.promises.readFile).mockRejectedValueOnce(mockError);
      vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(parse.xbrl(directory)).rejects.toThrow(mockError);
      expect(console.error).toHaveBeenCalled();
    });

    it("XMLパースエラー時にエラーを投げること", async () => {
      const directory = "test/xbrl_files";
      const mockXbrlContent = "<invalid>xml</invalid>";
      const mockError = new Error("XMLパースエラー");

      vi.mocked(fs.readdirSync).mockReturnValueOnce(mockFiles);
      vi.mocked(fs.promises.readFile).mockResolvedValueOnce(mockXbrlContent);

      const mockParseStringPromise = vi.fn().mockRejectedValueOnce(mockError);
      const mockParser = { parseStringPromise: mockParseStringPromise };
      vi.spyOn(xml2js, "Parser").mockImplementation(() => mockParser as any);
      vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(parse.xbrl(directory)).rejects.toThrow(mockError);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
