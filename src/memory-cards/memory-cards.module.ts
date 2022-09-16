import { Module } from '@nestjs/common';
import { MemoryCardsService } from './memory-cards.service';
import { MemoryCardsController } from './memory-cards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MemoryCardsController],
  providers: [MemoryCardsService],
})
export class MemoryCardsModule {}
