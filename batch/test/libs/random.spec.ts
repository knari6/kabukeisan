import { beforeAll, describe, expect, it } from "vitest";
import { Random } from "../../src/libs/random";

describe("random", () => {
  let random: Random;

  beforeAll(() => {
    random = new Random();
  });
  describe("randomInt", () => {
    it("100から1000の値を返すこと", () => {
      const actual = random.randomInt(1000, 100);
      expect(actual).toBeLessThan(1000);
      expect(actual).toBeGreaterThan(100);
    });
    it("1から10の値を返すこと", () => {
      const actual = random.randomInt(10, 1);
      expect(actual).toBeGreaterThanOrEqual(1);
      expect(actual).toBeLessThanOrEqual(10);
    });
    it("maxとminが同じ場合その値を返すこと", () => {
      const actual = random.randomInt(5, 5);
      expect(actual).toBe(5);
    });
    it("maxとminが逆の場合も正しく動作すること", () => {
      const actual = random.randomInt(1, 10);
      expect(actual).toBeGreaterThanOrEqual(1);
      expect(actual).toBeLessThanOrEqual(10);
    });
    it("maxとminが負の数でも正しく動作すること", () => {
      expect(() => random.randomInt(-1, 10)).toThrow();
      expect(() => random.randomInt(-1, -1)).toThrow();
      expect(() => random.randomInt(10, -1)).toThrow();
    });
  });
});
