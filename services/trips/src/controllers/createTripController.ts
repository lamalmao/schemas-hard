import { string, z, coerce, number } from 'zod';
import client from '../db.js';
import auth from '../auth.js';

const CreateTripDataObject = z.object({
  token: string(),
  name: string(),
  description: string(),
  startDate: coerce.date(),
  boat: number()
});

const createTripController = async (
  req: ReturnType<typeof CreateTripDataObject.parse>,
  res: (data: { id?: number; error?: string }) => any
) => {
  try {
    const { boat, description, name, startDate, token } =
      CreateTripDataObject.parse(req);

    const userId = await auth(token);
    if (!userId) {
      throw new Error('Unauthorized');
    }

    if (startDate <= new Date()) {
      throw new Error('The start date is too early');
    }

    const checkBoat = await client.boat.count({
      where: {
        id: boat
      }
    });
    if (checkBoat === 0) {
      throw new Error('Boat not found');
    }

    const trip = await client.trip.create({
      data: {
        name,
        description,
        boatId: boat,
        startDate
      }
    });

    res({ id: trip.id });
  } catch (error) {
    res({
      error: (error as Error).message
    });
  }
};

export default createTripController;
