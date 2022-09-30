import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from 'src/stage/dto/activity';
import { LearningProgram } from 'src/learning-program/entities/learning-program.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  timeSpan: number;

  @Column('text', { array: true })
  activities: Activity[];

  @ManyToOne(
    () => LearningProgram,
    (learningProgram) => learningProgram.stages,
    { eager: false },
  )
  learningProgram?: LearningProgram;
}
