import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
