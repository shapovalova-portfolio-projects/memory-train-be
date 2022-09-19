import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemoryCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  imageSource: string;

  @Column()
  audioSource: string;

  @ManyToOne(() => User, (user) => user.memoryCards, { eager: false })
  user: User;
}
