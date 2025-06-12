import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getDailyFeedback(userInput) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
You are an AI productivity coach named Muku. A user has entered the following description of their day:

"${userInput}"

Respond with:
1. A productivity score (out of 100)
2. A short summary of their day
3. Personalized feedback and encouragement

Your response format:
{
  "score": 78,
  "summary": "You completed most of your goals despite feeling tired.",
  "feedback": "Great job pushing through the fatigue. Try to sleep well tonight."
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const json = text.slice(jsonStart, jsonEnd);
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('Invalid AI response');
  }
}
