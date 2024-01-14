import { Router } from 'express';
import userRouter from './userRouter.js';
import tripsRouter from './tripsRouter.js';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/trips', tripsRouter);

export default apiRouter;
