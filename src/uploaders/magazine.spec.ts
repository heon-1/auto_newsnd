import puppeteer from 'puppeteer';
import { Login, Publish } from './magazine';
import { Config } from '../config/config';
import { sleep } from '../libs/utils';

test('메거진 테스트', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
    });
    try {
        const [page] = await browser.pages();
        await page.setViewport({
            width: 1000,
            height: 900,
            deviceScaleFactor: 1,
        });

        await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36`);

        await Login(page, Config.MAGAZINE.ID, Config.MAGAZINE.PASSWORD);
        sleep(2000);

        await Publish(page);
        sleep(2000);
    } catch (err) {
    } finally {
        await browser.close();
    }
});
