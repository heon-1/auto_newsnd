import { Page } from 'puppeteer';
import { sleep } from '../libs/utils';

export async function Login(page: Page, id: string, password: string) {
    await page.goto(`https://www.nftdive.io/member/login.html`);

    // 로그인
    await page.waitForXPath(`//*[@id="user_id"]`, { timeout: 2000 });
    await page.waitForXPath(`//*[@id="user_pw"]`, { timeout: 2000 });
    await page.type(`#user_id`, id);
    await page.type(`#user_pw`, password);
    await page.click(`#loginForm > button`);

    // 페이지 대기
    await page.waitForXPath(`//*[@id="admin-header"]/article[1]/span`, { timeout: 20000 });
}

export default async function UploadMegazine(page: Page, title: string, subTitle: string, content: string) {
    // 글쓰기
    await page.goto(`http://cms.nftdive.io/news/userArticleWriteForm.html`);

    await page.waitForXPath(`//*[@id="title"]`);
    await page.type(`#title`, title);
    await sleep(4000);
    await page.type(`#subTitle`, subTitle);
    await sleep(4000);
    await page.select(`#sectionCode`, `S1N1`);
    await sleep(4000);
    await page.select(`#subSectionCode`, `S2N9`);
    await sleep(4000);
    const editFrame = await page.frames();

    await editFrame[2].click(`html`, { delay: 1000 });
    await sleep(4000);
    await page.keyboard.type(content, { delay: 10 });
    await sleep(900);
    await page.click(`#btmAnchor > div > button `);
}

export async function Publish(page: Page) {
    try {
        await page.goto(`http://cms.nftdive.io/news/userWriterArticleList.html`);
        await page.waitForXPath(`//*[@id="admin-section-list"]/article`, { timeout: 20000 });

        const articleList = await page.$$(`#admin-section-list > article`);

        const links = [];
        for (const article of articleList) {
            const link = await article.$(`h4 > a`);
            const linkHref = await link?.evaluate((el) => el.getAttribute(`href`));
            if (!linkHref) {
                continue;
            }
            links.push(`http://cms.nftdive.io${linkHref}`);
        }
        console.log(links);
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        for (const link of links) {
            await page.goto(link);
            await sleep(2000);

            const button = await page.$(`#article-recognition-btn`);
            const buttonText = await button?.evaluate((button) => button.textContent);

            if (buttonText?.includes(`승인신청`)) {
                await page.click(`#article-recognition-btn`);
            }

            await sleep(2000);
        }
    } catch (err) {
        throw err;
    }
}
