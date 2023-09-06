import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GetBlockWorksFirstOne() {
    try {
        const res = await axios({
            url: 'https://blockworks.co/',
            method: 'GET',
            headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36`,
            },
        });

        const $ = cheerio.load(res.data);

        const $firstOne = $(`#__next > div > main > section.flex > div.order-1 > div > div.flex > div:nth-child(1)`);
        const category = $firstOne.find(`div:nth-child(1) > p`).text();
        const title = $firstOne.find(`div:nth-child(2)`).text();
        const link = $firstOne.find(`div:nth-child(2) > a `).attr();
        const description = $firstOne.find(`div:nth-child(3)`).text();
        const publisher = $firstOne.find(`div:nth-child(4) > div:nth-child(1) > span > a`).text();
        const publishedAt = $firstOne.find(`div:nth-child(4) > div:nth-child(2) > time`).attr();
        return {
            category,
            title,
            description,
            publisher,
            publishedAt: publishedAt?.datetime,
            link: `https://blockworks.co${link?.href}`,
        };
    } catch (err) {
        throw new Error('수집 에러');
    }
}

export async function GetBlockWorksDetail(url: string) {
    try {
        const res = await axios({
            url: url,
            method: 'GET',
            headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36`,
            },
        });

        if (res.status !== 200) {
            throw Error('status code error');
        }
        console.log(res.status);

        const $ = cheerio.load(res.data);
        let text = ``;

        $('div.prose')
            .find('p')
            .each((_, ele) => {
                text += $(ele).text();
                if ($(ele).next().is('hr')) {
                    return false;
                }
            });

        return text;
    } catch (err) {
        throw new Error('수집 에러');
    }
}

//
