import { Router } from 'express';
import { soap } from 'express-soap';
import createTripController from '../controllers/createTripController.js';
import wsdl from '../wsdl.js';
import getTripController from '../controllers/getTripController.js';
import deleteTripController from '../controllers/deleteTripController.js';

const tripsRouter = Router();

tripsRouter.use(
  '/trips',
  soap({
    services: {
      TripsService: {
        Trips: {
          CreateTrip: createTripController,
          GetTrip: getTripController,
          DeleteTrip: deleteTripController
        }
      }
    },
    wsdl
  })
);

export default tripsRouter;
