import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import apiRouter from './routers/apiRouter.js';
import { tripsClient, usersClient } from './clients.js';

(async () => {
  const configLoadResult = config();
  if (configLoadResult.error) {
    console.log(configLoadResult.error.message);
    process.exit(0);
  }

  await tripsClient.init();
  await usersClient.init();

  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use('/api', apiRouter);

  app.listen(3000, 'localhost', () =>
    console.log('Gateway server started at port 3000')
  );
})();
