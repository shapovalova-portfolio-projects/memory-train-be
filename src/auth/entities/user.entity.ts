import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}