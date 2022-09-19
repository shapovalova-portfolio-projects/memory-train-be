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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemoryCardsService } from './memory-cards.service';
import { AuthGuard } from '@nestjs/passport';
import { MemoryCard } from './entities/memory-card.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('memory-cards')
@Controller('memory-cards')
@UseGuards(AuthGuard())
export class MemoryCardsController {
  constructor(private readonly memoryCardsService: MemoryCardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create memory card' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: MemoryCard,
  })
  create(
    @Body() memoryCard: MemoryCard,
    @GetUser() user: User,
  ): Promise<MemoryCard> {
    return this.memoryCardsService.create(memoryCard, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all memory cards' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Array<MemoryCard>,
  })
  findAll(@GetUser() user: User): Promise<MemoryCard[]> {
    return this.memoryCardsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get memory card by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: MemoryCard,
  })
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<MemoryCard> {
    return this.memoryCardsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update memory card' })
  @ApiResponse({
    status: 200,
    description: 'The udpated record',
    type: UpdateResult,
  })
  update(
    @Body() memoryCard: MemoryCard,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.memoryCardsService.update(memoryCard, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete memory card' })
  @ApiResponse({
    status: 200,
    description: 'Deleted record',
    type: DeleteResult,
  })
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.memoryCardsService.remove(id, user);
  }
}
