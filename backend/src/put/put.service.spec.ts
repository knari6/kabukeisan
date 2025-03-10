import { Test, TestingModule } from '@nestjs/testing';
import { PutService } from './put.service';

describe('PutService', () => {
  let service: PutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PutService],
    }).compile();

    service = module.get<PutService>(PutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
