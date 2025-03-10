import { Test, TestingModule } from '@nestjs/testing';
import { PutController } from './put.controller';
import { PutService } from './put.service';

describe('PutController', () => {
  let controller: PutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PutController],
      providers: [PutService],
    }).compile();

    controller = module.get<PutController>(PutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
