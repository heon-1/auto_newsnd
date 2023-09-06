import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Unique, ManyToOne } from 'typeorm';
import Twitter from './Twitter';
import News from './News';
import Log from './Log';

@Entity()
export default class ChatGPT {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    gptId: string;

    @Column()
    metaDescription: string; // content,title,description

    @ManyToOne(() => Twitter, (twitter) => twitter)
    twitter: Twitter;

    @ManyToOne(() => News, (news) => news.gpt)
    news: News;

    @ManyToOne(() => Log, (log) => log.chatGpt)
    log: Log;

    @Column('text')
    prompt: string;

    @Column()
    role: string;

    @Column('text')
    content: string;

    @Column()
    modelName: string;

    @Column()
    promtTokens: number;

    @Column()
    completionTokens: number;

    @Column()
    totalTokens: number;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;
}
