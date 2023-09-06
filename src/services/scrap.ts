import { GetBlockWorksFirstOne, GetBlockWorksDetail } from '../scrappers/blockworks';
import { GetCoinTeleGraphRssFirstOne, GetCoinTeleGraphDetail } from '../scrappers/coinTelegraph';
import { GetCoinDeskRSSFirstOne, GetCoinDeskDetail } from '../scrappers/coindesk';
import GetRecentTwitByChannelName from '../scrappers/twitter';
import puppeteer from 'puppeteer';
import News from '../entities/News';
import { AppDataSource } from '../data-source';
import Twitter from '../entities/Twitter';
import Log from '../entities/Log';

const journalName = {
    blockWorks: 'blockWorks',
    teleGraph: 'teleGraph',
    coinDesk: 'coinDesk',
};

export async function ScrapAll() {
    // init chrome browser
    const browser = await puppeteer.launch({
        headless: 'new',
    });

    try {
        const [page] = await browser.pages();
        await page.setViewport({
            width: 1980,
            height: 1080,
        });
        await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36`);

        const [blockWorks, teleGraph, coinDesk, twitter] = await Promise.all([
            GetBlockWorksFirstOne(),
            GetCoinTeleGraphRssFirstOne(),
            GetCoinDeskRSSFirstOne(),
            GetRecentTwitByChannelName(page),
        ]);

        const logRepo = AppDataSource.getRepository(Log);
        const log = logRepo.create();
        logRepo.save(log);

        // blockWorks 쿼리
        const newsRepo = AppDataSource.getRepository(News);
        const blockWorksNews = await newsRepo.findOne({
            where: {
                journal: journalName.blockWorks,
                url: blockWorks.link,
            },
        });
        if (!blockWorksNews) {
            const content = await GetBlockWorksDetail(blockWorks.link);
            const blockWorksObj = newsRepo.create();
            blockWorksObj.journal = journalName.blockWorks;
            blockWorksObj.author = blockWorks.publisher;
            if (blockWorks?.publishedAt) {
                blockWorksObj.publishedAt = new Date(blockWorks.publishedAt);
            }

            blockWorksObj.description = blockWorks.description;
            blockWorksObj.url = blockWorks.link;
            blockWorksObj.title = blockWorks.title;
            blockWorksObj.content = content;
            blockWorksObj.log = log;
            await newsRepo.insert(blockWorksObj);
        }

        // coinTeleGraph
        const coinTeleGraphNews = await newsRepo.findOne({
            where: {
                journal: journalName.teleGraph,
                url: teleGraph.link,
            },
        });

        if (!coinTeleGraphNews) {
            const content = await GetCoinTeleGraphDetail(teleGraph.link as string);
            const coinTeleGraphObj = newsRepo.create();
            coinTeleGraphObj.journal = journalName.teleGraph;
            coinTeleGraphObj.author = teleGraph.creator as string;
            if (teleGraph.pubDate) {
                coinTeleGraphObj.publishedAt = new Date(teleGraph.pubDate);
            }

            coinTeleGraphObj.description = teleGraph.contentSnippet as string;

            coinTeleGraphObj.url = teleGraph.link as string;
            coinTeleGraphObj.title = teleGraph.title as string;
            coinTeleGraphObj.content = content;
            coinTeleGraphObj.log = log;
            await newsRepo.insert(coinTeleGraphObj);
        }

        // coinDesk
        const coinDeskNews = await newsRepo.findOne({
            where: {
                journal: journalName.coinDesk,
                url: coinDesk.link,
            },
        });

        if (!coinDeskNews) {
            const content = await GetCoinDeskDetail(coinDesk.link as string);
            const coinDeskObj = newsRepo.create();
            coinDeskObj.journal = journalName.coinDesk;
            coinDeskObj.author = coinDesk.creator as string;
            if (coinDesk.pubDate) {
                coinDeskObj.publishedAt = new Date(coinDesk.pubDate);
            }

            coinDeskObj.description = coinDesk.contentSnippet as string;

            coinDeskObj.url = coinDesk.link as string;
            coinDeskObj.title = coinDesk.title as string;
            coinDeskObj.content = content;
            coinDeskObj.log = log;
            await newsRepo.insert(coinDeskObj);
        }

        // twitter
        const twitterRepo = AppDataSource.getRepository(Twitter);

        const twitterNews = await twitterRepo.findOne({
            where: {
                publishedAt: new Date(twitter.publishedAt),
            },
        });

        if (!twitterNews) {
            const twitterObj = twitterRepo.create();
            twitterObj.author = twitter.author;
            twitterObj.channelName = twitter.channelName;
            twitterObj.content = twitter.content;
            twitterObj.publishedAt = new Date(twitter.publishedAt);
            twitterObj.log = log;
            await twitterRepo.insert(twitterObj);
        }
    } catch (err) {
        throw err;
    } finally {
        await browser.close();
    }
}
