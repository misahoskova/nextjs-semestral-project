'use client';

import { FaCheck, FaTimes, FaTrash, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Todo = {
  id: number;
  name: string;
  description: string | null;
  completed: boolean;
  priority: number;
};

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  highlightedId?: number | null;
};

export default function TodoTable({
  todos,
  onDelete,
  onToggle,
  highlightedId,
}: Props) {
  return (
    <Card className="max-w-6xl mx-auto">
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Název</TableHead>
              <TableHead>Popis</TableHead>
              <TableHead>Dokončeno</TableHead>
              <TableHead>Priorita</TableHead>
              <TableHead className="text-center w-40">Akce</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-6"
                >
                  Žádné úkoly k zobrazení.
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => {
                const isHighlighted = highlightedId === todo.id;
                const completedClass = todo.completed
                  ? 'text-muted-foreground line-through bg-muted'
                  : '';
                const highlightClass = isHighlighted
                  ? 'animate-pulse bg-blue-100'
                  : '';

                return (
                  <TableRow
                    key={todo.id}
                    className={`${completedClass} ${highlightClass} transition`}
                  >
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.name}</TableCell>
                    <TableCell>
                      {todo.description || (
                        <span className="italic text-muted-foreground">
                          Žádný popis
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {todo.completed ? <FaCheck /> : <FaTimes />}
                    </TableCell>
                    <TableCell>
                      {todo.priority === 3 ? (
                        <Badge variant="destructive">Vysoká</Badge>
                      ) : todo.priority === 2 ? (
                        <Badge variant="secondary">Střední</Badge>
                      ) : (
                        <Badge variant="outline">Nízká</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onToggle(todo.id, !todo.completed)}
                          title="Přepnout stav"
                        >
                          {todo.completed ? <FaTimes /> : <FaCheck />}
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(todo.id)}
                          title="Smazat"
                        >
                          <FaTrash />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Upravit úkol"
                        >
                          <Link href={`/todo/${todo.id}`}>
                            <FaEdit />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
