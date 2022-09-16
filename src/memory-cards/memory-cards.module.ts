import { Module } from '@nestjs/common';
import { MemoryCardsService } from './memory-cards.service';
import { MemoryCardsController } from './memory-cards.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryCard } from './entities/memory-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryCard]), AuthModule],
  controllers: [MemoryCardsController],
  providers: [MemoryCardsService],
})
export class MemoryCardsModule {}
