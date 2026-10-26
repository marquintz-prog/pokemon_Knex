import { randomUUID } from 'node:crypto';
import db from '../config/db.js';

export const pokemonTypes = ['normal', 'fogo', 'agua', 'grama', 'voador', 'lutador', 'venenoso'];
const table = 'pokemons';

export async function listPokemons() {
  return db(table).select('*').orderBy('nome');
}

export async function getPokemon(id) {
  return db(table).where({ id }).first();
}

export async function createPokemon(data) {
  const [pokemon] = await db(table).insert({ id: randomUUID(), ...data }).returning('*');
  return pokemon;
}

export async function replacePokemon(id, data) {
  const [pokemon] = await db(table).where({ id }).update(data).returning('*');
  return pokemon;
}

export async function deletePokemon(id) {
  const [pokemon] = await db(table).where({ id }).delete().returning('*');
  return pokemon;
}
