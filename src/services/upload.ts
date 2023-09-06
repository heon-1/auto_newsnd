// import {} from 'typeorm'

import Log from '../entities/Log';
import { AppDataSource } from '../data-source';
import OpenAI from '../libs/openAi';
import { Config } from '../config/config';
import ChatGPT from '../entities/ChatGPT';
import UploadMegazine, { Login, Publish } from '../uploaders/magazine';
import puppeteer from 'puppeteer';
import { sleep } from '../libs/utils';

export async function UploadToMagazine() {
    const openAI = new OpenAI(Config.OPEN_AI.api_key);
    try {
        const logRepo = AppDataSource.getRepository(Log);
        const gptRepo = AppDataSource.getRepository(ChatGPT);
        const logIsNotUploadedList = await logRepo.find({
            where: {
                isUploaded: false,
            },
            relations: {
                news: true,
                twitter: true,
            },
        });

        if (logIsNotUploadedList.length === 0) {
            return;
        }
        const needUploadDatas: { logID: number; content: { title: string; description: string; content: string }[] }[] = [];

        for (const data of logIsNotUploadedList) {
            let needUploadData: { logID: number; content: { title: string; description: string; content: string }[] } = {
                logID: data.id,
                content: [],
            };

            for (const d of data.news) {
                const res_content = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [{ role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` }],
                    3000,
                    1
                );
                await gptRepo.insert({
                    log: data,
                    gptId: res_content.id,
                    metaDescription: 'content',
                    news: d,
                    prompt: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘`,
                    completionTokens: res_content.usage.completion_tokens,
                    modelName: res_content.model,
                    role: res_content.choices[0].message.role,
                    content: res_content.choices[0].message.content,
                    promtTokens: res_content.usage.prompt_tokens,
                    totalTokens: res_content.usage.total_tokens,
                });

                let res_title = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [
                        { role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` },
                        { role: 'user', content: `한글로 제목 만들어줘 30자 이내` },
                    ],
                    3000,
                    1
                );
                await gptRepo.insert({
                    log: data,
                    gptId: res_title.id,
                    metaDescription: 'title',
                    prompt: `한글로 제목 만들어줘 30자 이내`,
                    news: d,
                    completionTokens: res_title.usage.completion_tokens,
                    modelName: res_title.model,
                    role: res_title.choices[0].message.role,
                    content: res_title.choices[0].message.content,
                    promtTokens: res_title.usage.prompt_tokens,
                    totalTokens: res_title.usage.total_tokens,
                });

                let res_des = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [
                        { role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` },
                        { role: 'user', content: `설명을 한글로 50자 이내로 요약해줘` },
                    ],
                    3000,
                    1
                );
                await gptRepo.insert({
                    log: data,
                    gptId: res_des.id,
                    metaDescription: 'description',
                    news: d,
                    prompt: `설명을 한글로 50자 이내로 요약해줘`,
                    completionTokens: res_des.usage.completion_tokens,
                    modelName: res_des.model,
                    role: res_des.choices[0].message.role,
                    content: res_des.choices[0].message.content,
                    promtTokens: res_des.usage.prompt_tokens,
                    totalTokens: res_des.usage.total_tokens,
                });

                needUploadData.content.push({
                    content: res_content.choices[0].message.content,
                    title: res_title.choices[0].message.content,
                    description: res_des.choices[0].message.content,
                });
            }

            for (const d of data.twitter) {
                const res_content = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [{ role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` }],
                    3000,
                    1
                );

                await gptRepo.insert({
                    log: data,
                    gptId: res_content.id,
                    twitter: d,
                    metaDescription: 'content',
                    prompt: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘`,
                    completionTokens: res_content.usage.completion_tokens,
                    modelName: res_content.model,
                    role: res_content.choices[0].message.role,
                    content: res_content.choices[0].message.content,
                    promtTokens: res_content.usage.prompt_tokens,
                    totalTokens: res_content.usage.total_tokens,
                });

                const res_title = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [
                        { role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` },
                        { role: 'user', content: `한글로 제목 만들어줘 30자 이내` },
                    ],
                    3000,
                    1
                );

                await gptRepo.insert({
                    log: data,
                    gptId: res_title.id,
                    twitter: d,
                    metaDescription: 'title',
                    prompt: `한글로 제목 만들어줘 30자 이내`,
                    completionTokens: res_title.usage.completion_tokens,
                    modelName: res_title.model,
                    role: res_title.choices[0].message.role,
                    content: res_title.choices[0].message.content,
                    promtTokens: res_title.usage.prompt_tokens,
                    totalTokens: res_title.usage.total_tokens,
                });

                const res_description = await openAI.CreateChatCompletion(
                    'gpt-3.5-turbo',
                    [
                        { role: 'user', content: `${d.content} 를 한글로 번역해서 뉴스기사 작성해줘` },
                        { role: 'user', content: `설명을 50자 이내로 한글로 요약해줘` },
                    ],
                    3000,
                    1
                );

                await gptRepo.insert({
                    log: data,
                    gptId: res_description.id,
                    twitter: d,
                    metaDescription: 'description',
                    prompt: `설명을 50자 이내로 한글로 요약해줘`,
                    completionTokens: res_description.usage.completion_tokens,
                    modelName: res_description.model,
                    role: res_description.choices[0].message.role,
                    content: res_description.choices[0].message.content,
                    promtTokens: res_description.usage.prompt_tokens,
                    totalTokens: res_description.usage.total_tokens,
                });

                needUploadData.content.push({
                    content: res_content.choices[0].message.content,
                    title: res_title.choices[0].message.content,
                    description: res_description.choices[0].message.content,
                });
            }

            needUploadDatas.push(needUploadData);
        }
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        try {
            const [page] = await browser.pages();
            await page.setViewport({
                width: 1000,
                height: 900,
                deviceScaleFactor: 1,
            });
            await page.setUserAgent(
                `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36`
            );

            await Login(page, Config.MAGAZINE.ID, Config.MAGAZINE.PASSWORD);
            for (const d of needUploadDatas) {
                for (const dd of d.content) {
                    await sleep(3000);
                    await UploadMegazine(page, dd?.title, dd?.description, dd?.content);
                }
                await logRepo.update(d.logID, { isUploaded: true, publishedAt: new Date() });
                await Publish(page);
            }

            await browser.close();
        } catch (err) {
            throw err;
        } finally {
            await browser.close();
        }

        return logIsNotUploadedList;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
