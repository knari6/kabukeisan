import { describe, it, expect, beforeEach } from "vitest";
import { extractNumber } from "./test-helper";
import { Parse } from "../../src/libs/parse";

describe("test-helper", async () => {
  let xmlData: any;
  let parse: Parse;
  beforeEach(async () => {
    parse = new Parse();
    xmlData = await parse.xbrl("test/helper-xbrl");
  });
  describe("extractNumber", () => {
    it("値を返すこと", () => {
      const expected = 2688000000;
      const acutual = extractNumber(
        xmlData,
        "jppfs_cor:ToolsFurnitureAndFixturesNet",
        "CurrentYearInstant"
      );
      expect(acutual).toBe(expected);
    });
  });
});
