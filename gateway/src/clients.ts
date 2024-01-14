import UsersClient from './soapClients/users.js';
import TripsClient from './soapClients/trips.js';

export const usersClient = new UsersClient();
export const tripsClient = new TripsClient();

export default usersClient;
