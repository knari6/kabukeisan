import { Injectable } from '@nestjs/common';

@Injectable()
export class CallService {
  calculateOptionValue(
    timeToMaturity: number,
    upRate: number,
    downRate: number,
    riskFreeRate: number,
    callValueUp: number,
  ) {
    const time = timeToMaturity / 365;

    const probability =
      (Math.E ** ((riskFreeRate / 100) * time) - downRate) /
      (upRate - downRate);

    const optionValue =
      (probability * callValueUp + 0) *
      Math.E ** ((-riskFreeRate / 100) * time);

    return optionValue;
  }
}
