import OpenAI from './openAi';
import { Config } from '../config/config';

test('completion', async () => {
    const openAI = new OpenAI(Config.OPEN_AI.api_key);
    // gpt-3.5-turbo-16k :16,384 tokens

    // gpt-3.5-turbo : 4,096 tokens
    let res = await openAI.CreateChatCompletion(
        'gpt-3.5-turbo-16k',
        [
            {
                role: 'user',
                content: `Crypto miners are establishing a new voice in U.S. policy, starting up the Digital Energy Council to lobby for friendly policy as regulators and Congress are wrestling with the next steps in crypto regulation.The member group will be advocating for policies “that promote responsible and sustainable energy development, grid resilience, maintain United States competitiveness, and protect national security,” it said in a Tuesday statement.The miners are already in a difficult position with President Joe Biden’s White House, which has been calling for a punitive, 30% excise tax on mining operations for the “harms they impose on society.” Miners have also been facing steady criticism from Democratic lawmakers who say the companies threaten the environment. “The focus on how both the digital asset mining and energy industries can collaborate and work together to bolster energy infrastructure, increase resilience and support energy sustainability and efficiency has been lost in policy conversations,” said Tom Mapes, the new organization’s founder and president, who worked on energy policy at the Chamber of Digital Commerce, a wider crypto advocacy group.Mapes, who had also served as a chief of staff in the U.S. Department of Energy’s Office of International Affairs, said in a statement that “it’s important that energy and digital asset mining communities, both key stakeholders in our nation’s grid, have a real voice at the federal level.”Based in Washington, he’ll initially be the organization’s sole employee. He said a top priority is “to highlight that digital asset mining is a real-world tool that can be utilized to meet the United States energy goals.”“The Digital Energy Council is the only group in Washington, D.C., that is uniquely focused on the intersection of mining and energy abundance,” said Zach Bradford, the CEO of one of DEC’s member companies, CleanSpark (CLSK), a firm that’s been steadily expanding during the crypto winter.“Politics is a team sport, and the broader our coalition and the more dedicated the efforts, the better,” Bradford said in an emailed statement.Read More: Through It All, the Bitcoin Mining Industry Looks Set for Growth  뉴스 기사 작성해줘 한국어로 번역도 해줘`,
            },
        ],
        4000,
        1
    );
    console.log(res.choices[0].message);

    res = await openAI.CreateChatCompletion(
        'gpt-3.5-turbo-16k',
        [
            {
                role: 'user',
                content: `Crypto miners are establishing a new voice in U.S. policy, starting up the Digital Energy Council to lobby for friendly policy as regulators and Congress are wrestling with the next steps in crypto regulation.The member group will be advocating for policies “that promote responsible and sustainable energy development, grid resilience, maintain United States competitiveness, and protect national security,” it said in a Tuesday statement.The miners are already in a difficult position with President Joe Biden’s White House, which has been calling for a punitive, 30% excise tax on mining operations for the “harms they impose on society.” Miners have also been facing steady criticism from Democratic lawmakers who say the companies threaten the environment. “The focus on how both the digital asset mining and energy industries can collaborate and work together to bolster energy infrastructure, increase resilience and support energy sustainability and efficiency has been lost in policy conversations,” said Tom Mapes, the new organization’s founder and president, who worked on energy policy at the Chamber of Digital Commerce, a wider crypto advocacy group.Mapes, who had also served as a chief of staff in the U.S. Department of Energy’s Office of International Affairs, said in a statement that “it’s important that energy and digital asset mining communities, both key stakeholders in our nation’s grid, have a real voice at the federal level.”Based in Washington, he’ll initially be the organization’s sole employee. He said a top priority is “to highlight that digital asset mining is a real-world tool that can be utilized to meet the United States energy goals.”“The Digital Energy Council is the only group in Washington, D.C., that is uniquely focused on the intersection of mining and energy abundance,” said Zach Bradford, the CEO of one of DEC’s member companies, CleanSpark (CLSK), a firm that’s been steadily expanding during the crypto winter.“Politics is a team sport, and the broader our coalition and the more dedicated the efforts, the better,” Bradford said in an emailed statement.Read More: Through It All, the Bitcoin Mining Industry Looks Set for Growth  뉴스 기사 작성해줘 한국어로 번역도 해줘`,
            },
            {
                role: 'user',
                content: `제목 만들어줘`,
            },
        ],
        4000,
        1
    );
    console.log(res.choices[0].message);

    res = await openAI.CreateChatCompletion(
        'gpt-3.5-turbo-16k',
        [
            {
                role: 'user',
                content: `Crypto miners are establishing a new voice in U.S. policy, starting up the Digital Energy Council to lobby for friendly policy as regulators and Congress are wrestling with the next steps in crypto regulation.The member group will be advocating for policies “that promote responsible and sustainable energy development, grid resilience, maintain United States competitiveness, and protect national security,” it said in a Tuesday statement.The miners are already in a difficult position with President Joe Biden’s White House, which has been calling for a punitive, 30% excise tax on mining operations for the “harms they impose on society.” Miners have also been facing steady criticism from Democratic lawmakers who say the companies threaten the environment. “The focus on how both the digital asset mining and energy industries can collaborate and work together to bolster energy infrastructure, increase resilience and support energy sustainability and efficiency has been lost in policy conversations,” said Tom Mapes, the new organization’s founder and president, who worked on energy policy at the Chamber of Digital Commerce, a wider crypto advocacy group.Mapes, who had also served as a chief of staff in the U.S. Department of Energy’s Office of International Affairs, said in a statement that “it’s important that energy and digital asset mining communities, both key stakeholders in our nation’s grid, have a real voice at the federal level.”Based in Washington, he’ll initially be the organization’s sole employee. He said a top priority is “to highlight that digital asset mining is a real-world tool that can be utilized to meet the United States energy goals.”“The Digital Energy Council is the only group in Washington, D.C., that is uniquely focused on the intersection of mining and energy abundance,” said Zach Bradford, the CEO of one of DEC’s member companies, CleanSpark (CLSK), a firm that’s been steadily expanding during the crypto winter.“Politics is a team sport, and the broader our coalition and the more dedicated the efforts, the better,” Bradford said in an emailed statement.Read More: Through It All, the Bitcoin Mining Industry Looks Set for Growth  뉴스 기사 작성해줘 한국어로 번역도 해줘`,
            },
            {
                role: 'user',
                content: `설명을 만들건데 50자 이내로 요약해줘 `,
            },
        ],
        4000,
        1
    );
    console.log(res.choices[0].message);

    // {
    //   id: 'chatcmpl-7oN65P70EylSJYSj6AGZyFmjtjshS',
    //   object: 'chat.completion',
    //   created: 1692239541,
    //   model: 'gpt-3.5-turbo-0613',
    //   choices: [ { index: 0, message: [Object], finish_reason: 'length' } ],
    //   usage: { prompt_tokens: 17, completion_tokens: 19, total_tokens: 36 }
    // }

    // { role: 'assistant', content: '안녕! 어떻게 도와드릴까요' }
});
