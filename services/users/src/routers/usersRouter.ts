import { Router } from 'express';
import { soap } from 'express-soap';
import signupController from '../controllers/signupController.js';
import wsdl from '../wsdl.js';

const usersRouter = Router();

usersRouter.post(
  '/',
  soap({
    services: {
      AuthService: {
        Actions: {
          Signup: signupController
        }
      }
    },
    wsdl
  })
);

export default usersRouter;
