import { getDailyFeedback } from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { DateTime } from 'luxon';

export async function POST(req) {
  try {
    const { userId, content, date } = await req.json();

    const aiFeedback = await getDailyFeedback(content);

    // Ensure the date is treated in IST and saved in UTC for consistent querying
    const istDate = DateTime.fromISO(date, { zone: 'Asia/Kolkata' }).startOf('day');
    const dateToStore = istDate.toUTC().toJSDate();

    const savedEntry = await prisma.entry.create({
      data: {
        content,
        date: dateToStore, // ✅ aligned with IST day start
        score: aiFeedback.score,
        summary: aiFeedback.summary,
        feedback: aiFeedback.feedback,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(savedEntry);
  } catch (error) {
    console.error('Submit Entry Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
