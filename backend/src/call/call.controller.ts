import { Controller, Get, Query } from '@nestjs/common';
import { CallService } from './call.service';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}
  @Get()
  getOptionInfos(
    @Query('possiblePriceUp') possiblePriceUp: number,
    @Query('possiblePriceDown') possiblePriceDown: number,
    @Query('stockPrice') stockPrice: number,
    @Query('timeToMaturity') timeToMaturity: number,
    @Query('riskFreeRate') riskFreeRate: number,
  ) {
    const callValueUp = possiblePriceUp - stockPrice;
    const upRate = possiblePriceUp / stockPrice;
    const downRate = possiblePriceDown / stockPrice;
    return this.callService.calculateOptionValue(
      timeToMaturity,
      upRate,
      downRate,
      riskFreeRate,
      callValueUp,
    );
  }
}
