import puppeteer from 'puppeteer';
import { GetBlockWorksFirstOne, GetBlockWorksDetail } from './blockworks';

test('blockworks run', async () => {
    const res = await GetBlockWorksFirstOne();
    console.log(res);
});

test('blockWorks get Detail', async () => {
    const res = await GetBlockWorksDetail(`https://blockworks.co/news/coinbase-nonprofit-crypto-policy`);
    console.log(res);
});
