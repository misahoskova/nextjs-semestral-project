import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { todosTable } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, priority } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Neplatný název úkolu' },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    await db.insert(todosTable).values({
      name,
      description,
      completed: false,
      priority: priority ?? 1,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Chyba při přidávání úkolu:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}
