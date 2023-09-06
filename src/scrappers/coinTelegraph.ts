import Parser, { Enclosure, Item } from 'rss-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GetCoinTeleGraphRssFirstOne() {
    try {
        const parser: Parser = new Parser({
            headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' },
        });
        const feed = await parser.parseURL('https://cointelegraph.com/rss');
        return feed.items[0];
    } catch (err) {
        throw err;
    }
}

export async function GetCoinTeleGraphDetail(url: string) {
    try {
        const res = await axios({
            url: url,
            method: 'GET',
            headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36`,
            },
        });
        console.log(res.status);
        const $ = cheerio.load(res.data);

        return $(`article > div.post__content-wrapper > div.post-content`).text();
    } catch (err) {
        throw err;
    }
}
