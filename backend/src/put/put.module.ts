import { Module } from '@nestjs/common';
import { PutService } from './put.service';
import { PutController } from './put.controller';

@Module({
  controllers: [PutController],
  providers: [PutService],
})
export class PutModule {}
