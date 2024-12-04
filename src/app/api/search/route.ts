import { NextResponse } from 'next/server';
import prisma from '@/lib/client'; // Prisma client

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query.toLowerCase() } },
          { name: { contains: query.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}