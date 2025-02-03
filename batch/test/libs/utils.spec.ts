import { beforeEach, describe, expect, it } from "vitest";
import { Utils } from "../../src/libs/utils";

let utils: Utils;
describe("Utils", () => {
  beforeEach(() => {
    utils = new Utils();
  });
  describe("isYYYYMMDD", () => {
    it("YYYYMMDDの形式であること", () => {
      const result = utils.isYYYYMMDD("20250131");
      expect(result).toBe(true);
    });

    it("YYYYMMDDの形式でないこと", () => {
      const result = utils.isYYYYMMDD("田中");
      expect(result).toBe(false);
    });

    it("YYYYMMDDの形式でないこと", () => {
      const result = utils.isYYYYMMDD("2025-01-31");
      expect(result).toBe(false);
    });
  });

  describe("isYYYYMMDDWithHyphen", () => {
    it("YYYYMMDDの形式であること", () => {
      const result = utils.isYYYYMMDDWithHyphen("2025-01-31");
      expect(result).toBe(true);
    });

    it("YYYYMMDDの形式でないこと", () => {
      const result = utils.isYYYYMMDDWithHyphen("田中");
      expect(result).toBe(false);
    });

    it("YYYYMMDDの形式でないこと", () => {
      const result = utils.isYYYYMMDDWithHyphen("20250131");
      expect(result).toBe(false);
    });
  });
});
