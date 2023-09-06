import axios from 'axios';

interface iconfig {
    apiKey: string;
    host: string;
}

interface imessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export default class OpenAI {
    private config: iconfig = {
        host: 'https://api.openai.com',
        apiKey: '',
    };

    constructor(apiKey: string) {
        this.config.apiKey = apiKey;
    }

    async CreateChatCompletion(modelName: string, messages: imessage[], maxToken: number, temperature: number) {
        try {
            const response = await axios({
                method: 'POST',
                baseURL: this.config.host,
                url: '/v1/chat/completions',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.config.apiKey}`,
                },
                data: {
                    model: modelName,
                    messages: messages,
                    max_tokens: maxToken,
                    temperature: temperature,
                },
                timeout: 2000000,
            });

            if (response.status != 200) {
                throw Error('response error');
            }

            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
