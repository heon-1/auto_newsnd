import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import Log from './Log';
import Twitter from './Twitter';

@Entity()
export default class TwitterImage {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Twitter, (twitter) => twitter.image)
    twitter: Twitter;

    @Column()
    source: string;

    @Column()
    description: string;
}
