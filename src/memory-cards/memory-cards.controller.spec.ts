import { Test, TestingModule } from '@nestjs/testing';
import { MemoryCardsController } from './memory-cards.controller';
import { MemoryCardsService } from './memory-cards.service';

describe('MemoryCardsController', () => {
  let controller: MemoryCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoryCardsController],
      providers: [MemoryCardsService],
    }).compile();

    controller = module.get<MemoryCardsController>(MemoryCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
