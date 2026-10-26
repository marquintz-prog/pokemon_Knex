import { pool } from '../database/pool.js';

class treinadorService {
  async getall() {
    const res = await pool.query('SELECT * FROM treinadores');
    return res.rows;
  }

  async getById(id) {
    const res = await pool.query('SELECT * FROM treinadores WHERE id = $1', [id]);
    return res.rows[0];
  }

  async create({ nome }) {
    const res = await pool.query(
      'INSERT INTO treinadores (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    return res.rows[0];
  }
  
  async delete(id) {
    const res = await pool.query('DELETE FROM treinadores WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }

  async update(id, { nome }) {
    const res = await pool.query(
      'UPDATE treinadores SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    return res.rows[0];
  }
}

export const treinadoresServices = new treinadorService();
