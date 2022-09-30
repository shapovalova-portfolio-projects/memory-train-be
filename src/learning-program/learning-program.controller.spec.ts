import { Test, TestingModule } from '@nestjs/testing';
import { LearningProgramController } from './learning-program.controller';

describe('LearningProgramController', () => {
  let controller: LearningProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningProgramController],
    }).compile();

    controller = module.get<LearningProgramController>(LearningProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
