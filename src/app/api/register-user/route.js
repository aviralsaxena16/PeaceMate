import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const body = await req.json();
  const { id, email, name } = body;

  // Check if user exists
const existingUser = await prisma.user.findUnique({
    where: { id },
});

  if (existingUser) {
    return Response.json({ status: 'exists' });
  }

  // Create new user
  await prisma.user.create({
    data: { id, email, name },
  });

  return Response.json({ status: 'created' });
}
