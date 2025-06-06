import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { todosTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, completed } = body;

    if (typeof id !== 'number' || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Neplatné vstupní hodnoty' },
        { status: 400 }
      );
    }

    await db.update(todosTable).set({ completed }).where(eq(todosTable.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Chyba při přepínání stavu úkolu:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}
