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
}
