import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoryCardsModule } from './memory-cards/memory-cards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MemoryCardsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
