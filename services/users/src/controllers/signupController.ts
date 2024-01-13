import { string, z } from 'zod';
import client from '../db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secret = process.env['SECRET'] as string;

type SignupRequestData = {
  login: string;
  password: string;
  email?: string;
  firstName: string;
  lastName: string;
};

type SignupResponseData = {
  token: string;
  error?: string;
};

const SignupDataObject = z.object({
  login: string().regex(/^[a-z0-9!@-_]{4,}$/i),
  password: string().regex(/^[a-z0-9!@#$%^&*()-_=+]{6,}$/i),
  email: string().email().optional(),
  firstName: string(),
  lastName: string()
});

const signupController = async (
  req: SignupRequestData,
  res: (SignupResponseData) => any
) => {
  try {
    const userData = SignupDataObject.parse(req);

    const salt = crypto.randomBytes(32).toString('hex');
    const password = crypto
      .pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    const user = await client.user.create({
      data: {
        ...userData,
        password,
        salt
      }
    });

    const token = jwt.sign(
      {
        id: user.id
      },
      secret,
      {
        algorithm: 'HS512',
        expiresIn: '7d'
      }
    );

    res({
      token
    });
  } catch (error) {
    res({
      error: (error as Error).message
    });
  }
};

export default signupController;
