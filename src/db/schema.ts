import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

export const todosTable = sqliteTable('todos', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  completed: int({ mode: 'boolean' }).notNull(),
  priority: int().notNull().default(1),
});
