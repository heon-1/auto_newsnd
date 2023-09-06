import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Twitter from './Twitter';
import News from './News';
import ChatGPT from './ChatGPT';

@Entity()
export default class Log {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToMany(() => Twitter, (twitter) => twitter.log)
    twitter: Twitter[];

    @OneToMany(() => News, (news) => news.log)
    news: News[];

    @OneToMany(() => ChatGPT, (gpt) => gpt.log)
    chatGpt: ChatGPT[];

    @Column({ default: false })
    isUploaded: boolean;

    @Column({ nullable: true })
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
