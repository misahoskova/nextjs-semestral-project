import { db } from '@/db/client';
import { todosTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import TodoDetail from '@/components/todo/TodoDetail';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function TodoDetailPage({ params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const [todo] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));

  if (!todo) {
    notFound();
  }

  return <TodoDetail todo={todo} />;
}
