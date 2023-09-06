import puppeteer from 'puppeteer';
import GetRecentTwitByChannelName from './twitter';

test('twitter run', async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const [page] = await browser.pages();
    await page.setViewport({
        width: 1980,
        height: 1080,
    });

    await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36`);

    const response = await GetRecentTwitByChannelName(page);
    console.log(response);
});
