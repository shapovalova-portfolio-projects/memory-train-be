import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Progress } from './entities/progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async create(progress: Progress, user: User): Promise<Progress> {
    const { status, stageNumber, learningProgram } = progress;
    const createdProgress = this.progressRepository.create({
      status,
      stageNumber,
      learningProgram,
      user,
    });
    await this.progressRepository.save(createdProgress);
    return createdProgress;
  }

  async findAll(user: User): Promise<Progress[]> {
    return await this.progressRepository.findBy({
      user,
    } as FindOptionsWhere<Progress>);
  }

  async findOne(id: string, user: User): Promise<Progress> {
    return await this.progressRepository.findOneBy({
      user,
      id,
    } as FindOptionsWhere<Progress>);
  }

  async update(progress: Progress, user: User): Promise<UpdateResult> {
    const progressToUpdate: unknown = await this.findOne(progress.id, user);
    if (!progressToUpdate) {
      throw new UnauthorizedException(
        'You are not elligible to update this progress',
      );
    }
    return await this.progressRepository.update(
      progressToUpdate as FindOptionsWhere<Progress>,
      progress,
    );
  }

  async remove(id: string, user: User): Promise<DeleteResult> {
    const progressToDelete: unknown = await this.findOne(id, user);
    if (!progressToDelete) {
      throw new UnauthorizedException(
        'You are not elligible to remove this progress',
      );
    }
    return await this.progressRepository.delete(
      progressToDelete as FindOptionsWhere<Progress>,
    );
  }
}
