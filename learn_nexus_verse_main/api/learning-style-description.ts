import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { style, counts } = req.body;

  if (!style || !counts) {
    return res.status(400).json({ error: 'Missing style or counts' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const prompt = `
The user took a learning style quiz. Their dominant style is: ${style}.
Here are the counts for each style: ${JSON.stringify(counts)}.
Write a short, friendly, 2-3 sentence description of what this means for their learning and how they can use this knowledge to study better.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim() || 'No description generated.';

    return res.status(200).json({ description });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch description from OpenAI.' });
  }
} 