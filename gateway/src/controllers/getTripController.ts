import { Request, Response } from 'express';
import { z, string, number } from 'zod';
import { tripsClient } from '../clients.js';

const RequestObject = z.object({
  token: string(),
  id: number()
});

type GetTripRequestData = ReturnType<typeof RequestObject.parse>;

async function getTripController(
  req: Request<{}, {}, GetTripRequestData>,
  res: Response<{
    id?: number;
    name?: string;
    description?: string;
    boat?: number;
    startDate?: number;
    creationDate?: number;
    error?: string;
  }>
) {
  try {
    const data = RequestObject.parse(req.body);

    const result = await tripsClient.getTrip(data);
    const body = result as {
      id?: number;
      name?: string;
      description?: string;
      boat?: number;
      startDate?: number;
      creationDate?: number;
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

export default getTripController;
