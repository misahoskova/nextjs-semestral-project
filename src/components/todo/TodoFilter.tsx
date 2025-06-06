'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  search: string;
  filterPriority: number | null;
  filterCompleted: boolean | null;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: number | null) => void;
  onCompletedChange: (value: boolean | null) => void;
}

export default function TodoFilter({
  search,
  filterPriority,
  filterCompleted,
  onSearchChange,
  onPriorityChange,
  onCompletedChange,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Hledat podle názvu nebo popisu"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <Select
            value={filterPriority !== null ? filterPriority.toString() : 'all'}
            onValueChange={(value) =>
              onPriorityChange(value !== 'all' ? parseInt(value) : null)
            }
          >
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Všechny priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny priority</SelectItem>
              <SelectItem value="1">Nízká</SelectItem>
              <SelectItem value="2">Střední</SelectItem>
              <SelectItem value="3">Vysoká</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={
              filterCompleted === null ? 'all' : filterCompleted ? '1' : '0'
            }
            onValueChange={(value) =>
              onCompletedChange(
                value === 'all' ? null : value === '1' ? true : false
              )
            }
          >
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Všechny stavy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny stavy</SelectItem>
              <SelectItem value="1">Dokončeno</SelectItem>
              <SelectItem value="0">Nedokončeno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
