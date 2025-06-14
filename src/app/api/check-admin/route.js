// app/api/check-admin/route.ts
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return Response.json({ isAdmin: false });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return Response.json({ isAdmin: user?.isAdmin || false });
}
