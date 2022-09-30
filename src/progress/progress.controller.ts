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
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Progress } from './entities/progress.entity';
import { ProgressService } from './progress.service';

@Controller('progress')
@ApiBearerAuth()
@ApiTags('progress')
@Controller('progress')
@UseGuards(AuthGuard())
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Create progress' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Progress,
  })
  create(@Body() progress: Progress, @GetUser() user: User): Promise<Progress> {
    return this.progressService.create(progress, user);
  }
  @Get()
  @ApiOperation({ summary: 'Get all progress records' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Array<Progress>,
  })
  findAll(@GetUser() user: User): Promise<Progress[]> {
    return this.progressService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get progress by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Progress,
  })
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<Progress> {
    return this.progressService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update progress' })
  @ApiResponse({
    status: 200,
    description: 'The udpated record',
    type: UpdateResult,
  })
  update(
    @Body() progress: Progress,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.progressService.update(progress, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete progress' })
  @ApiResponse({
    status: 200,
    description: 'Deleted record',
    type: DeleteResult,
  })
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.progressService.remove(id, user);
  }
}
