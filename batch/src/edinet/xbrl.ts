import * as fs from "fs";
import * as path from "path";

import dotenv from "dotenv";

dotenv.config();

const detectXbrl = (docId: string) => {
  const publicDocPath = path.join(process.cwd(), `XBRL_${docId}`, "PublicDoc");
  const files = fs.readdirSync(publicDocPath);
  const xbrlFile = files.find((file) => file.endsWith(".xbrl"));

  if (!xbrlFile) {
    console.error("No matching XBRL file found.");
    process.exit(1);
  }

  return {
    filePath: path.join(publicDocPath, xbrlFile),
    fileName: xbrlFile,
  };
};

/**
 * XBRLファイルからデータを取得する
 * @param {string} docId - ドキュメントID
 * @param {string} secCode - 証券コード
 * @param {string} filterName - フィルター名
 * @returns {Promise<Object>} 抽出されたデータ
 */
const getXbrlData = async (docId: string) => {
  const { filePath } = detectXbrl(docId);
  const xbrlContent = fs.readFileSync(filePath, "utf-8");

  try {
    console.log("hello");
  } catch (error) {
    console.error("Error parsing XBRL:", error);
    throw error;
  }
};

module.exports = {
  getXbrlData,
  detectXbrl,
};
