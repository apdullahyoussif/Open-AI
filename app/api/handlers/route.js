/** @format */

// app/api/handlers/route.js
import axios from 'axios';

export async function POST(req) {
	try {
		const { message } = await req.json();

		const apiResponse = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: message }],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return new Response(
			JSON.stringify({ response: apiResponse.data.choices[0].message.content }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error fetching data from OpenAI:', error);
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 429) {
				return new Response(
					JSON.stringify({
						error: 'Too many requests. Please try again later.',
					}),
					{ status: 429 }
				);
			}
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
			});
		}
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		});
	}
}
