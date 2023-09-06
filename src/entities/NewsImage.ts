import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import News from './News';

@Entity()
export default class NewsImage {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => News, (news) => news.image)
    news: News;

    @Column()
    source: string;

    @Column()
    description: string;
}
