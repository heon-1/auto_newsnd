import { Page } from 'puppeteer';

interface TwitterContentResponse {
    content: string;
    author: string;
    channelName: string;
    imageSrc: string | null;
    publishedAt: string;
}

export default async function GetRecentTwitByChannelName(page: Page, channelName: string = 'DegenerateNews'): Promise<TwitterContentResponse> {
    await page.goto(`https://twitter.com/${channelName}`);

    await page.waitForXPath(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[2]/div[2]/div[2]`
    );

    const [contentEle] = await page.$x(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[2]/div[2]/div[2]`
    );

    const [imageEle] = await page.$x(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[2]/div[2]/div[3]/div/div/div/div/div/div/a/div/div[2]/div/img`
    );
    const [postedAtEle] = await page.$x(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[1]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div[2]/div/div[3]/a/time`
    );
    const [authorEle] = await page.$x(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[2]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div[2]/div/div[1]/a/div/span`
    );
    const [channelEle] = await page.$x(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/section/div/div/div/div/div[2]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div[1]/div/a/div/div[1]/span/span`
    );
    let result: TwitterContentResponse = {
        author: '',
        channelName: '',
        content: '',
        publishedAt: '',
        imageSrc: null,
    };

    result.content = (await page.evaluate((node) => node.textContent, contentEle)) as string;
    result.author = (await page.evaluate((node) => node.textContent, authorEle)) as string;
    result.channelName = (await page.evaluate((node) => node.textContent, channelEle)) as string;
    // @ts-ignore
    result.publishedAt = (await page.evaluate((node) => node.getAttribute(`datetime`), postedAtEle)) as string;

    if (imageEle) {
        result.imageSrc = await imageEle.evaluate(
            // @ts-ignore
            (node: Node) => node.getAttribute('src'),
            imageEle
        );
    }

    return result;
}
