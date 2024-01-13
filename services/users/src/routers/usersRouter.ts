import { Router } from 'express';
import { soap } from 'express-soap';
import signupController from '../controllers/signupController.js';
import signinController from '../controllers/signinController.js';
import wsdl from '../wsdl.js';

const usersRouter = Router();

usersRouter.use(
  '/users',
  soap({
    services: {
      UsersService: {
        Users: {
          Signup: signupController,
          Signin: signinController
        }
      }
    },
    wsdl
  })
);

export default usersRouter;
