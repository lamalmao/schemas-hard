import { number, string, z } from 'zod';
import client from '../db.js';
import auth from '../auth.js';

const GetTripDataObject = z.object({
  token: string(),
  id: number().positive()
});

const getTripController = async (
  req: ReturnType<typeof GetTripDataObject.parse>,
  res: (data: {
    id?: number;
    name?: string;
    description?: string;
    creationDate?: number;
    startDate?: number;
    boat?: number;
    error?: string;
  }) => any
) => {
  try {
    const { id, token } = GetTripDataObject.parse(req);

    const user = await auth(token);
    if (!user) {
      throw new Error('Unauthorized');
    }

    const trip = await client.trip.findFirst({
      where: {
        id
      }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }

    res({
      id: trip.id,
      name: trip.name,
      description: trip.description || '',
      boat: trip.boatId,
      creationDate: trip.creationDate.getTime(),
      startDate: trip.startDate.getTime()
    });
  } catch (error) {
    res({
      error: (error as Error).message
    });
  }
};

export default getTripController;
