import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { todosTable } from '@/db/schema';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, priority } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  await db.insert(todosTable).values({
    name,
    description,
    priority: priority ?? 1,
    completed: false,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
