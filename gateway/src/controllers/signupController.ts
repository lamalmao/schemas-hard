import { Request, Response } from 'express';
import { z, string } from 'zod';
import usersClient from '../clients.js';

const RequestObject = z.object({
  login: string().regex(/^[a-z0-9!@-_]{4,}$/i),
  password: string().regex(/^[a-z0-9!@#$%^&*()-_=+]{6,}$/i),
  email: string().email(),
  firstName: string(),
  lastName: string()
});

type SignupRequestData = ReturnType<typeof RequestObject.parse>;

async function signupController(
  req: Request<{}, {}, SignupRequestData>,
  res: Response<{
    token?: string;
    error?: string;
  }>
) {
  try {
    const data = RequestObject.parse(req.body);

    const result = await usersClient.signup(data);
    const body = result as {
      token?: string;
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

export default signupController;
