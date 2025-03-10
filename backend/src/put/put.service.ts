import { Injectable } from '@nestjs/common';

@Injectable()
export class PutService {
  calculateOptionValue(
    timeToMaturity: number,
    upRate: number,
    downRate: number,
    riskFreeRate: number,
    putValueUp: number,
  ) {
    const time = timeToMaturity / 365;

    const probability =
      (Math.E ** ((riskFreeRate / 100) * time) - downRate) /
      (upRate - downRate);

    const optionValue =
      (probability * putValueUp + 0) * Math.E ** ((-riskFreeRate / 100) * time);

    return optionValue;
  }
}
