import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MemoryCard } from 'src/memory-cards/entities/memory-card.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  surname?: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => MemoryCard, (memoryCard) => memoryCard.user, {
    eager: true,
  })
  memoryCards: MemoryCard[];

  @OneToMany(() => Progress, (progress) => progress.user, {
    eager: true,
  })
  progress: Progress[];
}
