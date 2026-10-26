import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const trainers = await db('treinadores').select('*').orderBy('nome');
    res.json(trainers);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const nome = typeof req.body?.nome === 'string' ? req.body.nome.trim() : '';
    if (!nome) return res.status(400).json({ erro: 'nome é obrigatório e deve ser um texto não vazio.' });
    const [trainer] = await db('treinadores').insert({ id: randomUUID(), nome }).returning('*');
    res.status(201).json(trainer);
  } catch (error) { next(error); }
});

export default router;
