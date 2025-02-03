import { expect, it, beforeEach, describe, vi, afterEach } from "vitest";
import { DateUtil } from "../../src/libs/date";

describe("DateUtil", () => {
  let dateUtil: DateUtil;
  beforeEach(() => {
    dateUtil = new DateUtil();
  });
  describe("getToday", () => {
    it("Date型を返すこと", () => {
      const result = DateUtil.getToday();
      expect(result).toBeInstanceOf(Date);
    });

    it("現在の日付を返すこと", () => {
      const result = DateUtil.getToday();
      const now = new Date();

      expect(result.getFullYear()).toBe(now.getFullYear());
      expect(result.getMonth()).toBe(now.getMonth());
      expect(result.getDate()).toBe(now.getDate());
    });

    it("時刻が現在時刻に近いこと", () => {
      const result = DateUtil.getToday();
      const now = new Date();

      // 実行時間の誤差を考慮して1秒以内であることを確認
      expect(Math.abs(result.getTime() - now.getTime())).toBeLessThan(1000);
    });
  });

  describe("getISODate", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-03-20T12:00:00.000Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("ISO形式の日付文字列を返すこと", () => {
      const result = DateUtil.getISODate();
      expect(result).toBe("2024-03-20T12:00:00.000Z");
    });
  });

  describe("getYYYYMMDD", () => {
    it("YYYYMMDDのフォーマットで返すこと", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month =
        today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1;
      const day =
        today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
      const result = DateUtil.getYYYYMMDD(today);
      const expected = `${year}${month}${day}`;
      expect(result).toBe(expected);
    });
    it("9月であれば09と返すこと", () => {
      const date = DateUtil.getDate("2024-09-01");
      const result = DateUtil.getYYYYMMDD(date);
      const expected = "20240901";
      expect(result).toBe(expected);
    });

    it("10月であれば10と返すこと", () => {
      const date = DateUtil.getDate("2024-10-01");
      const result = DateUtil.getYYYYMMDD(date);
      const expected = "20241001";
      expect(result).toBe(expected);
    });

    it("9日であれば09と返すこと", () => {
      const date = DateUtil.getDate("2024-09-09");
      const result = DateUtil.getYYYYMMDD(date);
      const expected = "20240909";
      expect(result).toBe(expected);
    });
  });

  describe("getYYYYMMDDWithHyphens", () => {
    it("YYYY-MM-DDのフォーマットで返すこと", () => {
      const today = new Date();
      const result = DateUtil.getYYYYMMDDWithHyphens(today);
      const expected = DateUtil.getYYYYMMDD(today).replace(
        /(\d{4})(\d{2})(\d{2})/,
        "$1-$2-$3"
      );
      expect(result).toBe(expected);
    });
  });

  describe("getDate", () => {
    it("Date型を返すこと", () => {
      const dateString = "2025-01-01";

      const result = DateUtil.getDate(dateString);
      expect(result).toBeInstanceOf(Date);
    });

    it("YYYY-MM-DDの文字列を入力した際にDate型を返す(文字列が正しいかのチェック)", () => {
      const dateString = "2025-01-01";
      const result = DateUtil.getDate(dateString).toString();
      const expected = "Wed Jan 01 2025 09:00:00 GMT+0900 (日本標準時)";
      expect(result).toBe(expected);
    });
  });
});
