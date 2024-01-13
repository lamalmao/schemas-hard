import { string, z } from 'zod';
import client from '../db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secret = process.env['SECRET'] as string;

type SigninRequestData = {
  login: string;
  password: string;
};

type SigninResponseData = {
  token: string;
  error?: string;
};

const SigninDataObject = z.object({
  login: string().regex(/^[a-z0-9!@-_]{4,}$/i),
  password: string().regex(/^[a-z0-9!@#$%^&*()-_=+]{6,}$/i)
});

const signinController = async (
  req: SigninRequestData,
  res: (SigninResponseData) => any
) => {
  try {
    const { login, password } = SigninDataObject.parse(req);

    const user = await client.user.findFirst({
      where: {
        login
      },
      select: {
        id: true,
        password: true,
        salt: true
      }
    });

    if (!user) {
      throw new Error('Access not provided');
    }

    const checkPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (checkPassword !== user.password) {
      throw new Error('Access not provided');
    }

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

export default signinController;
