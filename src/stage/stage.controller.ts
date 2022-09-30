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
  import { Stage } from './entities/stage.entity';
  import { StageService } from './stage.service';
  
  @Controller('stage')
  @ApiBearerAuth()
  @ApiTags('stage')
  @Controller('stage')
  @UseGuards(AuthGuard())
  export class StageController {
    constructor(private readonly stageService: StageService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create stage' })
    @ApiResponse({
      status: 200,
      description: 'The found records',
      type: Stage,
    })
    create(@Body() stage: Stage): Promise<Stage> {
      return this.stageService.create(stage);
    }
    @Get()
    @ApiOperation({ summary: 'Get all memory cards' })
    @ApiResponse({
      status: 200,
      description: 'The found records',
      type: Array<Stage>,
    })
    findAll(): Promise<Stage[]> {
      return this.stageService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get stage by id' })
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: Stage,
    })
    findOne(@Param('id') id: string): Promise<Stage> {
      return this.stageService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update stage' })
    @ApiResponse({
      status: 200,
      description: 'The udpated record',
      type: UpdateResult,
    })
    update(
      @Body() stage: Stage,
    ): Promise<UpdateResult> {
      return this.stageService.update(stage);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete stage' })
    @ApiResponse({
      status: 200,
      description: 'Deleted record',
      type: DeleteResult,
    })
    remove(
      @Param('id') id: string,
    ): Promise<DeleteResult> {
      return this.stageService.remove(id);
    }
  }
  