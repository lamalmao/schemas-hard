import { Router } from 'express';
import signupController from '../controllers/signupController.js';
import signinController from '../controllers/signinController.js';

const userRouter = Router();

userRouter.post('/signup', signupController);
userRouter.post('/signin', signinController);

export default userRouter;
