import { Controller, Get, Query } from '@nestjs/common';
import { PutService } from './put.service';

@Controller('put')
export class PutController {
  constructor(private readonly putService: PutService) {}
  @Get()
  getOptionInfos(
    @Query('possiblePriceUp') possiblePriceUp: number,
    @Query('possiblePriceDown') possiblePriceDown: number,
    @Query('stockPrice') stockPrice: number,
    @Query('timeToMaturity') timeToMaturity: number,
    @Query('riskFreeRate') riskFreeRate: number,
  ) {
    const putValueUp = stockPrice - possiblePriceDown;
    const upRate = possiblePriceUp / stockPrice;
    const downRate = possiblePriceDown / stockPrice;
    return this.putService.calculateOptionValue(
      timeToMaturity,
      upRate,
      downRate,
      riskFreeRate,
      putValueUp,
    );
  }
}
