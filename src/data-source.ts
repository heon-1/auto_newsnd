import 'reflect-metadata';
import Log from './entities/Log';
import Twitter from './entities/Twitter';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import News from './entities/News';
import NewsImage from './entities/NewsImage';
import TwitterImage from './entities/TwitterImage';
import ChatGPT from './entities/ChatGPT';
import { Config } from './config/config';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: Config.MYSQL.HOST,
    port: 3306,
    username: Config.MYSQL.USERNAME,
    password: Config.MYSQL.PASSWORD,
    database: Config.MYSQL.DB,
    synchronize: true,
    logging: false,
    charset: 'utf8mb4',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [Log, Twitter, News, NewsImage, TwitterImage, ChatGPT],
    migrations: [],
    subscribers: [],
});
