import { getDailyFeedback } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, content, date } = await req.json();

    const aiFeedback = await getDailyFeedback(content);

    const savedEntry = await prisma.entry.create({
      data: {
        userId,
        content,
        date: new Date(date),
        score: aiFeedback.score,
        summary: aiFeedback.summary,
        feedback: aiFeedback.feedback,
      },
    });

    return NextResponse.json(savedEntry);
  } catch (error) {
    console.error('Submit Entry Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
