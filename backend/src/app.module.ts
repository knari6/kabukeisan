import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallModule } from './call/call.module';
import { PutModule } from './put/put.module';

@Module({
  imports: [CallModule, PutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
