import { prisma } from '@/lib/prisma';
import { DateTime } from 'luxon';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get('date');
  const userId = searchParams.get('userId');

  if (!dateParam || !userId) {
    return new Response('Date and userId are required', { status: 400 });
  }

  try {
    // IST start of day, and start of next day
    const istStart = DateTime.fromISO(dateParam, { zone: 'Asia/Kolkata' }).startOf('day');
    const istNextDay = istStart.plus({ days: 1 });

    // Convert to UTC for DB range query (half-open interval)
    const startUTC = istStart.toUTC().toJSDate();
    const endUTC = istNextDay.toUTC().toJSDate();

    const entry = await prisma.entry.findFirst({
      where: {
        userId,
        date: {
          gte: startUTC,
          lt: endUTC,
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