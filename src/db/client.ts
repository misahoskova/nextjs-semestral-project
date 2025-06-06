import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

const isTest = process.env.NODE_ENV === 'test';

export const db = drizzle({
  connection: isTest ? 'file::memory:' : 'file:db.sqlite',
});
await migrate(db, { migrationsFolder: 'drizzle' });
