import * as jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const secretKey = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string => {
  console.log(secretKey);
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '2d' });
  return token;
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
