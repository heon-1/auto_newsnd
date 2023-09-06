import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne, UpdateDateColumn } from 'typeorm';
import Log from './Log';
import TwitterImage from './TwitterImage';
import ChatGPT from './ChatGPT';

@Entity()
export default class Twitter {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Log, (log) => log.news)
    log: Log;

    @OneToMany(() => TwitterImage, (image) => image.twitter)
    image: TwitterImage;

    @OneToMany(() => ChatGPT, (gpt) => gpt.twitter)
    gpt: ChatGPT;

    @Column('text')
    content: string;

    @Column()
    author: string;

    @Column()
    channelName: string;

    @Column()
    publishedAt: Date;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
