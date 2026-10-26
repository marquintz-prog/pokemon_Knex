import { Router } from 'express';
import { treinadoresServices } from '../services/treinadores.Services.js';

export const treinadoresRouter = Router();

treinadoresRouter.get('/', async (_req, res) => {
  try {
    const treinadores = await treinadoresServices.getall();
    return res.json(treinadores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar treinadores.' });
  }
});

treinadoresRouter.get('/:id', async (req, res) => {
  try {
    const treinador = await treinadoresServices.getById(req.params.id);
    return res.json(treinador);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar treinador.' });
  }
});

treinadoresRouter.post('/', async (req, res) => {
  try {
    const treinador = await treinadoresServices.create(req.body);
    return res.status(201).json(treinador);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao cadastrar treinador.' });
  }
});

treinadoresRouter.put('/:id', async (req, res) => {
  try {
    const treinador = await treinadoresServices.update(req.params.id, req.body);
    return res.json(treinador);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar treinador.' });
  }
});

treinadoresRouter.delete('/:id', async (req, res) => {
  try {
    const treinador = await treinadoresServices.delete(req.params.id);
    return res.json(treinador);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao excluir treinador.' });
  }
});
