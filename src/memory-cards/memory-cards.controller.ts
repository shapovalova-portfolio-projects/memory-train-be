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
import { CreateMemoryCardDto } from './dto/create-memory-card.dto';
import { UpdateMemoryCardDto } from './dto/update-memory-card.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('memory-cards')
@UseGuards(AuthGuard())
export class MemoryCardsController {
  constructor(private readonly memoryCardsService: MemoryCardsService) {}

  @Post()
  create(@Body() createMemoryCardDto: CreateMemoryCardDto) {
    return this.memoryCardsService.create(createMemoryCardDto);
  }

  @Get()
  findAll() {
    return this.memoryCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoryCardsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemoryCardDto: UpdateMemoryCardDto,
  ) {
    return this.memoryCardsService.update(+id, updateMemoryCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoryCardsService.remove(+id);
  }
}
