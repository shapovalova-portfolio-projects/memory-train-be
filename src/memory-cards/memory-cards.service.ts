import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { MemoryCard } from './entities/memory-card.entity';

@Injectable()
export class MemoryCardsService {
  constructor(
    @InjectRepository(MemoryCard)
    private memoryCardsRepository: Repository<MemoryCard>,
  ) {}

  async create(memoryCard: MemoryCard, user: User): Promise<MemoryCard> {
    const { title, text, imageSource = '', audioSource = '' } = memoryCard;
    const createdMemoryTask = this.memoryCardsRepository.create({
      title,
      text,
      imageSource,
      audioSource,
      user,
    });
    await this.memoryCardsRepository.save(createdMemoryTask);
    return createdMemoryTask;
  }

  async findAll(user: User): Promise<MemoryCard[]> {
    return await this.memoryCardsRepository.findBy({
      user,
    } as FindOptionsWhere<MemoryCard>);
  }

  async findOne(id: string, user: User): Promise<MemoryCard> {
    return await this.memoryCardsRepository.findOneBy({
      user,
      id,
    } as FindOptionsWhere<MemoryCard>);
  }

  async update(memoryCard: MemoryCard, user: User): Promise<UpdateResult> {
    const cardToUpdate = await this.findOne(memoryCard.id, user);
    if (!cardToUpdate) {
      throw new UnauthorizedException(
        'You are not elligible to update this card',
      );
    }
    return await this.memoryCardsRepository.update(
      cardToUpdate as FindOptionsWhere<MemoryCard>,
      memoryCard,
    );
  }

  async remove(id: string, user: User): Promise<DeleteResult> {
    const cardToDelete = await this.findOne(id, user);
    if (!cardToDelete) {
      throw new UnauthorizedException(
        'You are not elligible to remove this card',
      );
    }
    return await this.memoryCardsRepository.delete(
      cardToDelete as FindOptionsWhere<MemoryCard>,
    );
  }
}
