import { User } from 'src/auth/entities/user.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stage } from 'src/stage/entities/stage.entity';

@Entity()
export class LearningProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToOne(() => Progress, (progress) => progress.learningProgram, {
    eager: false,
  })
  progress?: Progress;

  @OneToMany(() => Stage, (stage) => stage.learningProgram, {
    eager: false,
  })
  stages: Partial<Stage>[];

  @ManyToOne(() => User, (user) => user.learningPrograms, { eager: false })
  user: User;
}
