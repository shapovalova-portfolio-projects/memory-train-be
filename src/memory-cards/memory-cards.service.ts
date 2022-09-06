import { Injectable } from '@nestjs/common';
import { CreateMemoryCardDto } from './dto/create-memory-card.dto';
import { UpdateMemoryCardDto } from './dto/update-memory-card.dto';

@Injectable()
export class MemoryCardsService {
  create(createMemoryCardDto: CreateMemoryCardDto) {
    return 'This action adds a new memoryCard';
  }

  findAll() {
    return `This action returns all memoryCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memoryCard`;
  }

  update(id: number, updateMemoryCardDto: UpdateMemoryCardDto) {
    return `This action updates a #${id} memoryCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} memoryCard`;
  }
}
