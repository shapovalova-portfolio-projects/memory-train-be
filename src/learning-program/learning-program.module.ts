import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LearningProgram } from './entities/learning-program.entity';
import { LearningProgramController } from './learning-program.controller';
import { LearningProgramService } from './learning-program.service';

@Module({
  imports: [TypeOrmModule.forFeature([LearningProgram]), AuthModule],
  controllers: [LearningProgramController],
  providers: [LearningProgramService],
})
export class LearningProgramModule {}
