import { Test, TestingModule } from '@nestjs/testing';
import { LearningProgramService } from './learning-program.service';

describe('LearningProgramService', () => {
  let service: LearningProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningProgramService],
    }).compile();

    service = module.get<LearningProgramService>(LearningProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
