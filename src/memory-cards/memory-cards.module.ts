import { Module } from '@nestjs/common';
import { MemoryCardsService } from './memory-cards.service';
import { MemoryCardsController } from './memory-cards.controller';

@Module({
  controllers: [MemoryCardsController],
  providers: [MemoryCardsService]
})
export class MemoryCardsModule {}
