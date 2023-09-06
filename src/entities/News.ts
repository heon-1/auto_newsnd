import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import NewsImage from './NewsImage';
import Log from './Log';
import ChatGPT from './ChatGPT';

@Entity()
export default class News {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Log, (log) => log.news)
    log: Log;

    // 저널 구분 인자
    @Column()
    @Index()
    journal: string;

    @OneToMany(() => ChatGPT, (gpt) => gpt.news)
    gpt: ChatGPT;

    @OneToMany(() => NewsImage, (image) => image.news)
    image: NewsImage;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    author: string;

    @Column('text')
    content: string;

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
