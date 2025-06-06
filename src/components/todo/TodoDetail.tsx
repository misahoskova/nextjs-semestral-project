'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Todo {
  id: number;
  name: string;
  description: string | null;
  completed: boolean;
  priority: number;
}

export default function TodoDetail({ todo }: { todo: Todo }) {
  const router = useRouter();

  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState(todo.priority);

  const handleUpdate = async () => {
    const res = await fetch('/api/update_todo', {
      method: 'POST',
      body: JSON.stringify({ id: todo.id, name, description, priority }),
    });

    if (res.ok) {
      router.push('/?message=Úkol byl upraven&type=success');
    } else {
      router.push('/?message=Chyba při ukládání&type=error');
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Upravit úkol #{todo.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Název</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Zadejte název"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Popis</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nepovinný popis úkolu"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="priority">Priorita</Label>
          <Select
            value={priority.toString()}
            onValueChange={(value) => setPriority(Number(value))}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Zvolte prioritu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Nízká</SelectItem>
              <SelectItem value="2">Střední</SelectItem>
              <SelectItem value="3">Vysoká</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleUpdate} className="w-full mt-4">
          Uložit změny
        </Button>
      </CardContent>
    </Card>
  );
}
