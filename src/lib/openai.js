import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1', // Groq's base URL
});

export async function getDailyFeedback(userInput) {
  const prompt = `
You are an AI productivity assistant named Muku built for an app called **PeaceMate**.

The user reflects on how their day went what all task they decided  and what they achieved. Based on their reflection, you will analyze it and respond ONLY with a clear JSON object that includes:
- A **productivity score** out of 100 (integer) based on how productive the day was.
- A **concise summary** (1-2 lines) describing their overall day.
- A **motivational or constructive feedback** (1-2 lines) tailored to the user's input.

Make sure:
- Your response is ONLY valid JSON. No explanations, no extra text.
- The score must vary realistically based on how good or bad the day was.
- Be empathetic, encouraging, but honest.
- Follow this exact structure and use double quotes ("):

{
  "score": 76,
  "summary": "You started strong but got slightly distracted in the evening.",
  "feedback": "Stay consistent and try to wrap up key tasks earlier in the day."
}

Now, here is the user's reflection:

"${userInput}"

Return only the JSON response as specified.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'llama3-8b-8192', // or 'llama3-70b-8192'
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 200,
    });

    const text = response.choices[0].message.content.trim();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const json = text.slice(jsonStart, jsonEnd);

    return JSON.parse(json);
  } catch (err) {
    console.error('Groq AI error:', err);
    throw new Error('AI feedback generation failed.');
  }
}
