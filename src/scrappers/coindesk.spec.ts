import puppeteer from 'puppeteer';
import { GetCoinDeskRSSFirstOne, GetDetail } from './coindesk';

test('coindesk run', async () => {
    const res = await GetCoinDeskRSSFirstOne();
    console.log(res);
});

test('coindesk getDetail', async () => {
    await GetDetail(`https://www.coindesk.com/tech/2023/08/10/vc-firm-a16z-wades-into-crypto-tech-research-with-zk-projects-jolt-and-lasso/`);
});
