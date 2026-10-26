import { Router } from 'express';
import {
  createPokemon,
  deletePokemon,
  getPokemon,
  listPokemons,
  pokemonTypes,
  replacePokemon,
} from '../services/pokemon.Service.js';

const router = Router();
const fields = ['nome', 'nivel', 'tipo', 'treinador_id'];

function validatePokemon(body, { partial = false } = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'O corpo deve ser um objeto JSON.';
  const keys = Object.keys(body);
  if (!keys.length) return 'Informe os dados do Pokémon.';
  if (keys.some((key) => !fields.includes(key))) return `Campos permitidos: ${fields.join(', ')}.`;
  if (!partial && fields.some((field) => !(field in body))) return `Todos os campos são obrigatórios: ${fields.join(', ')}.`;
  if ('nome' in body && (typeof body.nome !== 'string' || !body.nome.trim())) return 'nome deve ser um texto não vazio.';
  if ('nivel' in body && (!Number.isInteger(body.nivel) || body.nivel < 1)) return 'nivel deve ser um inteiro maior que zero.';
  if ('tipo' in body && !pokemonTypes.includes(body.tipo)) return `tipo deve ser um de: ${pokemonTypes.join(', ')}.`;
  if ('treinador_id' in body && (typeof body.treinador_id !== 'string' || !body.treinador_id.trim())) return 'treinador_id deve ser um UUID.';
  if ('nome' in body) body.nome = body.nome.trim();
  return null;
}

router.get('/', async (_req, res, next) => {
  try { res.json(await listPokemons()); } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pokemon = await getPokemon(req.params.id);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    res.json(pokemon);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const validationError = validatePokemon(req.body);
    if (validationError) return res.status(400).json({ erro: validationError });
    const pokemon = await createPokemon(req.body);
    res.status(201).json(pokemon);
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const validationError = validatePokemon(req.body);
    if (validationError) return res.status(400).json({ erro: validationError });
    const pokemon = await replacePokemon(req.params.id, req.body);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    res.json(pokemon);
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const validationError = validatePokemon(req.body, { partial: true });
    if (validationError) return res.status(400).json({ erro: validationError });
    const pokemon = await replacePokemon(req.params.id, req.body);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    res.json(pokemon);
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const pokemon = await deletePokemon(req.params.id);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    res.status(204).end();
  } catch (error) { next(error); }
});

export default router;
