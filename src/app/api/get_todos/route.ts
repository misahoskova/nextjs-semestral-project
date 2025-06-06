import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { todosTable } from '@/db/schema';

export async function GET() {
  try {
    const todos = await db.select().from(todosTable);
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Chyba při načítání úkolů:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}
