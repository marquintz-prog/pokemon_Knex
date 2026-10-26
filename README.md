# API de Pokemon

API em Express, PostgreSQL e Knex para cadastrar treinadores e fazer CRUD de Pokemon.

1. Configure o banco usando `.env.example` como referencia.
2. Execute `npm install`.
3. Execute `npm run db:migrate`.
4. Inicie com `npm run dev`.

Use `POST /treinadores` para criar um treinador. Em seguida use `GET` e `POST /pokemons`, `GET /pokemons/:id`, `PUT /pokemons/:id`, `PATCH /pokemons/:id` e `DELETE /pokemons/:id`.

Pokemon recebe `nome`, `nivel`, `tipo` (`normal`, `fogo`, `agua`, `grama`, `voador`, `lutador` ou `venenoso`) e `treinador_id`.
