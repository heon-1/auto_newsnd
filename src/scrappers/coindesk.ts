import Parser, { Enclosure, Item } from 'rss-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';

type CustomFeed = {};
type CustomItem = { creator: string; content: string[]; description: string };

export async function GetCoinDeskRSSFirstOne(): Promise<CustomItem & Parser.Item> {
    const parser: Parser<CustomFeed, CustomItem> = new Parser({
        customFields: {
            item: [[`dc:creator`, `creator`], `description`],
        },
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        },
    });
    const feed = await parser.parseURL('https://www.coindesk.com/arc/outboundfeeds/rss');

    return feed.items[0];
}

export async function GetCoinDeskDetail(url: string): Promise<string> {
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
        let text = ``;

        $(`#fusion-app`).each((i, el) => {
            console.log(i);
            //common-textstyles__StyledWrapper-sc-18pd49k-0 eSbCkN
            const str = $(el).find(`div.eSbCkN`).text();
            if (str) {
                text += str;
            }
            //title
            const str2 = $(el).find(`div.gsdJcW`).text();
            if (str2) {
                text += str2;
            }
            //
            const str3 = $(el).find(`div.OzCot`).text();
            if (str3) {
                text += str3;
            }
        });

        return text;
    } catch (err) {
        throw err;
    }
}
