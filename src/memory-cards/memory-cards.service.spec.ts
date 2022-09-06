import { Test, TestingModule } from '@nestjs/testing';
import { MemoryCardsService } from './memory-cards.service';

describe('MemoryCardsService', () => {
  let service: MemoryCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryCardsService],
    }).compile();

    service = module.get<MemoryCardsService>(MemoryCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
