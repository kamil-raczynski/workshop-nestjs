import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column({length: 150})
    description: string;

    @Column('int')
    points: number

    @Column()
    isDone: boolean
}