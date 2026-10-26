import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('A variável DATABASE_URL precisa estar definida.');
}

export default {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './src/db/migrations', extension: 'js' },
  },
};
