/** @param {import('knex').Knex} knex */
export async function up(knex) {
  await knex.schema.createTable('treinadores', (table) => {
    table.uuid('id').primary();
    table.string('nome', 120).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('pokemons', (table) => {
    table.uuid('id').primary();
    table.string('nome', 120).notNullable();
    table.integer('nivel').notNullable().check('?? >= 1', ['nivel']);
    table
      .enu('tipo', ['normal', 'fogo', 'agua', 'grama', 'voador', 'lutador', 'venenoso'], {
        useNative: true,
        enumName: 'pokemon_tipo',
      })
      .notNullable();
    table.uuid('treinador_id').notNullable().references('id').inTable('treinadores').onDelete('CASCADE');
    table.timestamps(true, true);
    table.index('treinador_id');
  });
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  await knex.schema.dropTableIfExists('pokemons');
  await knex.schema.dropTableIfExists('treinadores');
  await knex.raw('DROP TYPE IF EXISTS pokemon_tipo');
}
