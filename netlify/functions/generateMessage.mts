import { Context, Handler } from '@netlify/functions';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const features = ['Dark curly hair', 'hazel eyes', 'olive skin', 'kind heart', 'lust for life', 'dark humor'];

export default async (request: Request, context: Context) => {
    try {
        console.log(context);
        // Parse the incoming request body

        // Construct the prompt dynamically
        const prompt = `Write a short, cute and loving message for my girlfriend. MAx one sentences, but make it random length.
    Highlight the following features that I adore about her: ${features.join(', ')}. 
    Keep it sweet, fun, and make her feel special. Dont make it complicated. Choose just one of them, and write about it.`;

        // Make a request to OpenAI GPT
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
                max_tokens: 100
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const message = response.data.choices[0].message.content.trim();

        return new Response(message);
    } catch (error) {
        console.error('Error generating message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate message.' })
        };
    }
};
