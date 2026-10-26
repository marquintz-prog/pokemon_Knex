import { Router } from 'express';
import { pokemonsServices } from '../services/pokemons.Services.js';

export const pokemonsRouter = Router();

pokemonsRouter.get('/', async (_req, res) => {
  try {
    const pokemons = await pokemonsServices.getall();
    return res.json(pokemons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar Pokémons.' });
  }
});

pokemonsRouter.get('/:id', async (req, res) => {
  try {
    const pokemon = await pokemonsServices.getById(req.params.id);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    return res.json(pokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar Pokémon.' });
  }
});

pokemonsRouter.post('/', async (req, res) => {
  try {
    const pokemon = await pokemonsServices.create(req.body);
    return res.status(201).json(pokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao cadastrar Pokémon.' });
  }
});

pokemonsRouter.put('/:id', async (req, res) => {
  try {
    const pokemon = await pokemonsServices.update(req.params.id, req.body);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    return res.json(pokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar Pokémon.' });
  }
});

pokemonsRouter.delete('/:id', async (req, res) => {
  try {
    const pokemon = await pokemonsServices.delete(req.params.id);
    if (!pokemon) return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    return res.json(pokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao excluir Pokémon.' });
  }
});
