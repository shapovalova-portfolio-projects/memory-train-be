import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MemoryCardsModule } from './memory-cards/memory-cards.module';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import configuration from '../config/configuration';
import { MemoryCard } from './memory-cards/entities/memory-card.entity';
import { Stage } from './stage/entities/stage.entity';
import { StageModule } from './stage/stage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forFeature([User, MemoryCard, Stage]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, MemoryCard, Stage],
        ...configuration().database,
      }),
    }),
    MemoryCardsModule,
    AuthModule,
    StageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
