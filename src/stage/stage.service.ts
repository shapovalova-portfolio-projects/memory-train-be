import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Stage } from './entities/stage.entity';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository: Repository<Stage>,
  ) {}

  async create(stage: Stage): Promise<Stage> {
    const { timeSpan, activities } = stage;
    const createdStage = this.stageRepository.create({
      timeSpan,
      activities,
    });
    await this.stageRepository.save(createdStage);
    return createdStage;
  }

  async findAll(): Promise<Stage[]> {
    return await this.stageRepository.findBy({} as FindOptionsWhere<Stage>);
  }

  async findOne(id: string): Promise<Stage> {
    return await this.stageRepository.findOneBy({
      id,
    } as FindOptionsWhere<Stage>);
  }

  async update(stage: Stage): Promise<UpdateResult> {
    const stageToUpdate: unknown = await this.findOne(stage.id);
    if (!stageToUpdate) {
      throw new UnauthorizedException(
        'You are not elligible to update this stage',
      );
    }
    return await this.stageRepository.update(
      stageToUpdate as FindOptionsWhere<Stage>,
      stage,
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    const stageToDelete: unknown = await this.findOne(id);
    if (!stageToDelete) {
      throw new UnauthorizedException(
        'You are not elligible to remove this stage',
      );
    }
    return await this.stageRepository.delete(
      stageToDelete as FindOptionsWhere<Stage>,
    );
  }
}
