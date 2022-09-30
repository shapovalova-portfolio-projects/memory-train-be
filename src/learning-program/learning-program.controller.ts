import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LearningProgram } from './entities/learning-program.entity';
import { LearningProgramService } from './learning-program.service';

@Controller('learning-program')
@ApiBearerAuth()
@ApiTags('learning-program')
@Controller('learning-program')
@UseGuards(AuthGuard())
export class LearningProgramController {
  constructor(
    private readonly learningProgramService: LearningProgramService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create learning progress' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: LearningProgram,
  })
  create(
    @Body() learningProgram: LearningProgram,
    @GetUser() user: User,
  ): Promise<LearningProgram> {
    return this.learningProgramService.create(learningProgram, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learning programs' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Array<LearningProgram>,
  })
  findAll(@GetUser() user: User): Promise<LearningProgram[]> {
    return this.learningProgramService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get learning program by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: LearningProgram,
  })
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<LearningProgram> {
    return this.learningProgramService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update learning program' })
  @ApiResponse({
    status: 200,
    description: 'The udpated record',
    type: UpdateResult,
  })
  update(
    @Body() memoryCard: LearningProgram,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.learningProgramService.update(memoryCard, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete learning program' })
  @ApiResponse({
    status: 200,
    description: 'Deleted record',
    type: DeleteResult,
  })
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.learningProgramService.remove(id, user);
  }
}
