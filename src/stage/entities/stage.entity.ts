import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from 'src/stage/dto/activity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  timeSpan: number;

  @Column("text", { array: true })
  activities: Activity[];
}
