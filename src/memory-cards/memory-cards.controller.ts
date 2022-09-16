import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MemoryCardsService } from './memory-cards.service';
import { AuthGuard } from '@nestjs/passport';
import { MemoryCard } from './entities/memory-card.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('memory-cards')
@UseGuards(AuthGuard())
export class MemoryCardsController {
  constructor(private readonly memoryCardsService: MemoryCardsService) {}

  @Post()
  create(@Body() memoryCard: MemoryCard, @GetUser() user: User) {
    console.log(memoryCard);

    return this.memoryCardsService.create(memoryCard, user);
  }

  @Get()
  findAll(@GetUser() user: User): Promise<MemoryCard[]> {
    return this.memoryCardsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<MemoryCard> {
    return this.memoryCardsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Body() memoryCard: MemoryCard,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.memoryCardsService.update(memoryCard, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.memoryCardsService.remove(id, user);
  }
}
