import express from 'express';
import pokemonRoutes from './routes/pokemon.Route.js';
import trainerRoutes from './routes/treinador.Route.js';

const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/pokemons', pokemonRoutes);
app.use('/treinadores', trainerRoutes);
app.use((error, _req, res, _next) => {
  if (error.code === '23503') return res.status(400).json({ erro: 'treinador_id não corresponde a um treinador existente.' });
  if (error.code === '22P02') return res.status(400).json({ erro: 'ID inválido.' });
  console.error(error);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

export default app;
