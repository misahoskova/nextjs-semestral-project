'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface TodoFormProps {
  id?: number;
  initialName?: string;
  initialDescription?: string;
  initialPriority?: number;
  onSubmit: (
    name: string,
    description: string,
    priority: number
  ) => Promise<boolean>;
  onCreate?: () => Promise<void>;
  onFlash?: (message: string, type: 'success' | 'error') => void;
}

export default function TodoForm({
  id,
  initialName = '',
  initialDescription = '',
  initialPriority = 1,
  onSubmit,
  onFlash,
}: TodoFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setPriority(initialPriority);
  }, [initialName, initialDescription, initialPriority]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(name, description, priority);

    if (success) {
      onFlash?.('Úkol úspěšně přidán', 'success');
      setName('');
      setDescription('');
      setPriority(1);
    } else {
      onFlash?.('Chyba při přidávání úkolu', 'error');
    }
  };

  return (
    <div className="grid grid-col-3 gap-8">
      <Card className="w-full max-w-6xl p-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {id !== undefined && (
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" value={id} readOnly disabled />
              </div>
            )}

            <div>
              <Label htmlFor="name">Název úkolu</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Zadejte název"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Popis</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Zadejte popis"
              />
            </div>

            <div>
              <Label htmlFor="priority">Priorita</Label>
              <Select
                value={priority.toString()}
                onValueChange={(val) => setPriority(Number(val))}
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

            <div className="flex justify-end">
              <Button type="submit">Přidat úkol</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
