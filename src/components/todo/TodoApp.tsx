'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import TodoForm from '@/components/todo/TodoForm';
import TodoTable from '@/components/todo/TodoTable';
import TodoFilter from '@/components/todo/TodoFilter';

import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

type Todo = {
  id: number;
  name: string;
  description: string | null;
  completed: boolean;
  priority: number;
};

export default function TodoApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<number | null>(null);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const message = searchParams?.get('message');
    const type = searchParams?.get('type') as 'success' | 'error' | null;

    if (message && type) {
      setFlashMessage(message);
      setFlashType(type);

      const timeout = setTimeout(() => {
        setFlashMessage(null);
        setFlashType(null);
        router.replace('/', { scroll: false });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  const highlight = (id: number) => {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 500);
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/get_todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Chyba při načítání úkolů:', err);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/delete_todo', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    await loadTodos();
    highlight(id);
  };

  const handleToggle = async (id: number, completed: boolean) => {
    await fetch('/api/toggle_todo', {
      method: 'POST',
      body: JSON.stringify({ id, completed }),
    });
    await loadTodos();
    highlight(id);
  };

  const handleCreate = async () => {
    await loadTodos();
    if (todos.length > 0) {
      const maxId = Math.max(...todos.map((t) => t.id));
      highlight(maxId + 1);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.name.toLowerCase().includes(search.toLowerCase()) ||
      (todo.description ?? '').toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      filterPriority === null || todo.priority === filterPriority;

    const matchesCompleted =
      filterCompleted === null || todo.completed === filterCompleted;

    return matchesSearch && matchesPriority && matchesCompleted;
  });

  return (
    <main className="bg-background min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {flashMessage && (
          <Alert variant={flashType === 'success' ? 'default' : 'destructive'}>
            <AlertDescription>{flashMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <TodoForm onSubmit={handleCreate} />
          </CardContent>
        </Card>

        <TodoFilter
          search={search}
          filterPriority={filterPriority}
          filterCompleted={filterCompleted}
          onSearchChange={setSearch}
          onPriorityChange={setFilterPriority}
          onCompletedChange={setFilterCompleted}
        />

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <TodoTable
            todos={filteredTodos}
            onDelete={handleDelete}
            onToggle={handleToggle}
            highlightedId={highlightedId}
          />
        )}
      </div>
    </main>
  );
}
