import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Status } from 'src/progress/dto/status';
import { LearningProgram } from 'src/learning-program/entities/learning-program.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: Status;

  @Column("int")
  stageNumber: number;

  @ManyToOne(() => User, (user) => user.progress, { eager: false })
  user: User;

  @ManyToOne(
    () => LearningProgram,
    (learningProgram) => learningProgram.progress,
    { eager: false },
  )
  learningProgram: LearningProgram;
}
