import 'dotenv/config';
import express from 'express';
import { knex } from './database/knex.js';
import { pokemonsRouter } from './routes/Pokemons.Route.js';
import { treinadoresRouter } from './routes/Treinadores.Route.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/pokemons', pokemonsRouter);
app.use('/treinadores', treinadoresRouter);

const server = app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));

process.on('SIGINT', () => server.close(async () => { await knex.destroy(); process.exit(0); }));
process.on('SIGTERM', () => server.close(async () => { await knex.destroy(); process.exit(0); }));
