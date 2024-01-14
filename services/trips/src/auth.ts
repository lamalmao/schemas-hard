import jwt from 'jsonwebtoken';
import client from './db.js';

const secret = process.env['SECRET'] as string;

const auth = async (token: string) => {
  try {
    const check = jwt.verify(token, secret, {
      algorithms: ['HS512']
    });

    if (typeof check === 'string') {
      throw new Error('Validation failed');
    }

    const { exp, id } = check as {
      exp: number;
      id: number;
    };

    const expiresIn = new Date(exp * 1000);
    if (Date.now() > expiresIn.getTime()) {
      throw new Error('Token expired');
    }

    const userCheck = await client.user.count({
      where: {
        id
      }
    });

    if (userCheck === 0) {
      throw new Error('User not found');
    }

    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default auth;
