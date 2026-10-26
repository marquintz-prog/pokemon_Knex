# API de Pokémon com Knex

API REST em Express e PostgreSQL para cadastrar treinadores e gerenciar Pokémon. Cada Pokémon pertence a um treinador; treinadores podem ter vários Pokémon.

## Configuração

1. Instale as dependências com `npm install`.
2. Crie um banco PostgreSQL e copie `.env.example` para `.env`, preenchendo `DATABASE_URL`.
3. Execute `npm run db:migrate`.
4. Inicie com `npm start` (ou `npm run dev` durante o desenvolvimento).

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica o servidor |
| GET | `/treinadores` | Lista treinadores |
| POST | `/treinadores` | Cria treinador (`{ "nome": "Ash" }`) |
| GET | `/pokemons` | Lista Pokémon |
| GET | `/pokemons/:id` | Busca Pokémon por UUID |
| POST | `/pokemons` | Cria Pokémon |
| PUT | `/pokemons/:id` | Substitui os dados do Pokémon |
| PATCH | `/pokemons/:id` | Atualiza apenas os campos enviados |
| DELETE | `/pokemons/:id` | Exclui Pokémon |

Campos de Pokémon: `nome`, `nivel` (inteiro entre 1 e 100), `tipo` (`normal`, `fogo`, `agua`, `grama`, `voador`, `lutador` ou `venenoso`) e `treinador_id` (UUID de um treinador cadastrado).

Exemplo de criação:

```json
{
  "nome": "Pikachu",
  "nivel": 10,
  "tipo": "normal",
  "treinador_id": "UUID-do-treinador"
}
```

O campo `nivel` está limitado a 1–100. Excluir um treinador também exclui os Pokémon associados.
