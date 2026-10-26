import 'dotenv/config';
import knex from 'knex';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('A variável DATABASE_URL precisa estar definida.');
}

const db = knex({
  client: 'pg',
  connection: databaseUrl,
  pool: { min: 0, max: 10 },
});

export default db;
