import { Router } from 'express';
import createTripController from '../controllers/createTripController.js';
import getTripController from '../controllers/getTripController.js';
import deleteTripController from '../controllers/deleteTripController.js';

const tripsRouter = Router();

tripsRouter.post('/create', createTripController);
tripsRouter.post('/get', getTripController);
tripsRouter.post('/delete', deleteTripController);

export default tripsRouter;
