import { number, string, z } from 'zod';
import client from '../db.js';
import auth from '../auth.js';

const DeleteTripDataObject = z.object({
  token: string(),
  id: number().positive()
});

const deleteTripController = async (
  req: ReturnType<typeof DeleteTripDataObject.parse>,
  res: (data: { id?: number; error?: string }) => any
) => {
  try {
    const { id, token } = DeleteTripDataObject.parse(req);

    const user = await auth(token);
    if (!user) {
      throw new Error('Unauthorized');
    }

    const trip = await client.trip.delete({
      where: {
        id
      },
      select: {
        id: true
      }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }

    res({
      id: trip.id
    });
  } catch (error) {
    res({
      error: (error as Error).message
    });
  }
};

export default deleteTripController;
