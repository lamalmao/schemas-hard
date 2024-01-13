import express from 'express';
import usersRouter from './routers/usersRouter.js';
import client from './db.js';
import { config } from 'dotenv';

(async () => {
  const options = config();
  if (!options.parsed) {
    throw new Error('Failed to parse .env file');
  }

  await client.$connect();

  const app = express();
  app.use('/', usersRouter);

  app.listen(5000, 'localhost', () =>
    console.log('Users service started at port 5000')
  );
})();
