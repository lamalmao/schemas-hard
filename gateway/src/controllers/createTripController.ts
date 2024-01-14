import { Request, Response } from 'express';
import { z, string, number } from 'zod';
import { tripsClient } from '../clients.js';

const RequestObject = z.object({
  token: string(),
  name: string(),
  description: string(),
  startDate: number(),
  boat: number()
});

type CreateTripRequestData = ReturnType<typeof RequestObject.parse>;

async function createTripController(
  req: Request<{}, {}, CreateTripRequestData>,
  res: Response<{
    id?: number;
    error?: string;
  }>
) {
  try {
    const data = RequestObject.parse(req.body);

    const result = await tripsClient.createTrip(data);
    const body = result as {
      id?: number;
      error?: string;
    };

    if (body.error) {
      throw new Error(body.error);
    }

    res.json(body);
  } catch (error) {
    res.status(401);
    res.json({
      error: (error as Error).message
    });
  }
}

export default createTripController;
