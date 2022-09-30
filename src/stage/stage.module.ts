import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Stage } from './entities/stage.entity';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stage]), AuthModule],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
