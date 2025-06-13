import { prisma } from '@/lib/prisma';
import { DateTime } from 'luxon';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get('date'); // "2025-06-13"
  const userId = searchParams.get('userId');

  if (!dateParam || !userId) {
    return new Response('Date and userId are required', { status: 400 });
  }

  try {
    // Interpret the date in IST timezone
    const istStart = DateTime.fromISO(dateParam, { zone: 'Asia/Kolkata' }).startOf('day');
    const istEnd = istStart.endOf('day');

    // Convert to UTC for DB comparison
    const startUTC = istStart.toUTC().toJSDate();
    const endUTC = istEnd.toUTC().toJSDate();

    const entry = await prisma.entry.findFirst({
      where: {
        userId,
        date: {
          gte: startUTC,
          lte: endUTC,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(entry || {});
  } catch (error) {
    console.error('Error fetching entry:', error);
    return new Response('Error fetching entry', { status: 500 });
  }
}
