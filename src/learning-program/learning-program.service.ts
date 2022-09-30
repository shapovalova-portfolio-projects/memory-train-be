import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { LearningProgram } from 'src/learning-program/entities/learning-program.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class LearningProgramService {
  constructor(
    @InjectRepository(LearningProgram)
    private learningProgramRepository: Repository<LearningProgram>,
  ) {}

  async create(
    learningProgram: LearningProgram,
    user: User,
  ): Promise<LearningProgram> {
    const { title, stages } = learningProgram;
    const newProgress = this.learningProgramRepository.create({
      title,
      stages,
      user,
    });
    await this.learningProgramRepository.save(newProgress);
    return newProgress;
  }

  async findAll(user: User): Promise<LearningProgram[]> {
    return await this.learningProgramRepository.findBy({
      user,
    } as FindOptionsWhere<LearningProgram>);
  }

  async findOne(id: string, user: User): Promise<LearningProgram> {
    return await this.learningProgramRepository.findOneBy({
      user,
      id,
    } as FindOptionsWhere<LearningProgram>);
  }

  async update(
    learningProgram: LearningProgram,
    user: User,
  ): Promise<UpdateResult> {
    const learningProgramToUpdate: unknown = await this.findOne(
      learningProgram.id,
      user,
    );
    if (!learningProgramToUpdate) {
      throw new UnauthorizedException(
        'You are not elligible to update this program',
      );
    }
    return await this.learningProgramRepository.update(
      learningProgramToUpdate as FindOptionsWhere<LearningProgram>,
      learningProgram,
    );
  }

  async remove(id: string, user: User): Promise<DeleteResult> {
    const learningProgramToDelete: unknown = await this.findOne(id, user);
    if (!learningProgramToDelete) {
      throw new UnauthorizedException(
        'You are not elligible to remove this program',
      );
    }
    return await this.learningProgramRepository.delete(
      learningProgramToDelete as FindOptionsWhere<LearningProgram>,
    );
  }
}
