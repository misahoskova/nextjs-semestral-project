import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { todosTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, priority } = body;

    if (
      typeof id !== 'number' ||
      typeof name !== 'string' ||
      typeof priority !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Neplatné vstupní hodnoty' },
        { status: 400 }
      );
    }

    await db
      .update(todosTable)
      .set({ name, description, priority })
      .where(eq(todosTable.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Chyba při aktualizaci úkolu:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}
