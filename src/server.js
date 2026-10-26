import app from './app.js';
import db from './config/db.js';

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => console.log(`API disponível em http://localhost:${port}`));

async function shutdown() {
  server.close(async () => {
    await db.destroy();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
