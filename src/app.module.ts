import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import configuration from '../config/configuration';
import { MemoryCard } from './memory-cards/entities/memory-card.entity';
import { MemoryCardsModule } from './memory-cards/memory-cards.module';
import { Stage } from './stage/entities/stage.entity';
import { StageModule } from './stage/stage.module';
import { Progress } from './progress/entities/progress.entity';
import { ProgressModule } from './progress/progress.module';
import { LearningProgram } from './learning-program/entities/learning-program.entity';
import { LearningProgramModule } from './learning-program/learning-program.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forFeature([
      User,
      MemoryCard,
      Stage,
      Progress,
      LearningProgram,
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, MemoryCard, Stage, Progress, LearningProgram],
        ...configuration().database,
      }),
    }),
    MemoryCardsModule,
    AuthModule,
    StageModule,
    ProgressModule,
    LearningProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
