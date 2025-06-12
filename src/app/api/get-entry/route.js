import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get('date'); // e.g., "2025-06-12"

  if (!dateParam) {
    return new Response('Date is required', { status: 400 });
  }

  try {
    // Ensure the date is treated as local day start (optional: use UTC if your DB stores in UTC)
    const startOfDay = new Date(dateParam + 'T00:00:00.000Z');
    const endOfDay = new Date(dateParam + 'T23:59:59.999Z');

    const entry = await prisma.entry.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
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
