import express from 'express';
import tripsRouter from './routers/tripsRouter.js';
import client from './db.js';
import { config } from 'dotenv';
(async () => {
  const options = config();
  if (!options.parsed) {
    throw new Error('Failed to parse .env file');
  }

  await client.$connect();

  const app = express();
  app.use('/', tripsRouter);

  app.listen(5001, 'localhost', () =>
    console.log('Trips service started at port 5001')
  );
})();
