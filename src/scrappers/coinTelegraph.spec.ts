import puppeteer from 'puppeteer';
import { GetCoinTeleGraphRssFirstOne, GetCoinTeleGraphDetail } from './coinTelegraph';

test('cointelegrahp run', async () => {
    const res = await GetCoinTeleGraphRssFirstOne();
    console.log(res);
});

test('cointelegrahp getDetail', async () => {
    const res = await GetCoinTeleGraphDetail(`https://cointelegraph.com/news/coinbase-celebrates-art-music-and-gaming-with-a-three-week-blockchain-event`);

    console.log(res);
});
