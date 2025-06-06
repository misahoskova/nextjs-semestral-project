'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface TodoFormProps {
  id?: number;
  initialName?: string;
  initialDescription?: string;
  initialPriority?: number;
  onSubmit: (name: string, description: string, priority: number) => void;
  onCreate?: () => Promise<void>;
}

export default function TodoForm({
  id,
  initialName = '',
  initialDescription = '',
  initialPriority = 1,
  onSubmit,
}: TodoFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setPriority(initialPriority);
  }, [initialName, initialDescription, initialPriority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description, priority);
  };

  return (
    <div className="grid grid-col-3 gap-8">
      <Card className="w-full max-w-xl p-6">
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
              <Input
                id="priority"
                type="number"
                min={1}
                max={5}
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Uložit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
