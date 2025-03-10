import { QuarterType } from "./interfaces";

export class Random {
  public randomInt(max: number, min: number) {
    if (max < 0 || min < 0) {
      throw "負の整数は入力できません";
    }
    if (max === undefined || max === null) {
      throw "最大値の入力が正しくありません";
    }
    if (max < min) {
      return Math.floor(Math.random() * (min - max + 1)) + max;
    }
    if (max > min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return max;
  }

  public randomDate() {
    return new Date(
      this.randomInt(2025, 2020),
      this.randomInt(12, 1),
      this.randomInt(31, 1)
    );
  }

  public randomElement<T>(array: T[]): T {
    return array[this.randomInt(array.length - 1, 0)];
  }

  public randomQuarterType(): QuarterType {
    return this.randomElement(["Q1", "Q2", "Q3", "Q4", "FY"]);
  }
}
