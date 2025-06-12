import { getDailyFeedback } from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, content, date } = await req.json();

    const aiFeedback = await getDailyFeedback(content);

    const savedEntry = await prisma.entry.create({
  data: {
    content,
    date: new Date(),
    score: aiFeedback.score,
    summary: aiFeedback.summary,
    feedback: aiFeedback.feedback,
    user: {
      connect: { id: userId }, // ✅ This sets userId internally via relation
    },
  },
});


    return NextResponse.json(savedEntry);
  } catch (error) {
    console.error('Submit Entry Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
