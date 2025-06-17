// /api/submit-entry
import { getDailyFeedback } from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { DateTime } from 'luxon';

export async function POST(req) {
  try {
    const { userId, content, date } = await req.json();

    // Convert date string to IST start of day, then to UTC
    const istDate = DateTime.fromISO(date, { zone: 'Asia/Kolkata' }).startOf('day');
    const utcDate = istDate.toUTC();

    const aiFeedback = await getDailyFeedback(content);

    const savedEntry = await prisma.entry.create({
      data: {
        content,
        date: utcDate.toJSDate(),
        score: aiFeedback.score,
        summary: aiFeedback.summary,
        feedback: aiFeedback.feedback,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json({
      ...savedEntry,
      date: istDate.toISO(), // Return IST date for frontend
    });
  } catch (error) {
    console.error('Submit Entry Error:', error);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}
