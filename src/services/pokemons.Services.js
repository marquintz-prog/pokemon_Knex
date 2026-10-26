import { pool } from '../database/pool.js';

class PokemonsService {
  async getall() {
    const res = await pool.query('SELECT * FROM pokemons');
    return res.rows;
  }

  async getById(id) {
    const res = await pool.query('SELECT * FROM pokemons WHERE id = $1', [id]);
    return res.rows[0];
  }

  async create({ nome, nivel, tipo, treinador_id }) {
    const res = await pool.query(
      'INSERT INTO pokemons (nome, nivel, tipo, treinador_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, nivel, tipo, treinador_id]
    );
    return res.rows[0];
  }

  async update(id, dados) {
    const { nome, nivel, tipo, treinador_id } = dados;
    const res = await pool.query(
      'UPDATE pokemons SET nome = $1, nivel = $2, tipo = $3, treinador_id = $4 WHERE id = $5 RETURNING *',
      [nome, nivel, tipo, treinador_id, id]
    );
    return res.rows[0];
  }

  async delete(id) {
    const res = await pool.query('DELETE FROM pokemons WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

export const pokemonsServices = new PokemonsService();
