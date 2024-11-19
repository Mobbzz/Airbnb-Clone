// auth.ts

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export interface CustomRequest extends Request {
  userData?: JwtPayload & { _id: string; userId: string; email: string; displayName: string };
}

// Generera JWT-token
export const generateToken = (user: { _id: string; email: string; displayName: string }): string => {
  return jwt.sign({ userId: user._id, email: user.email, displayName: user.displayName }, secretKey, {
    expiresIn: '1d',
  });
};


export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Access restricted! Please Login!' });
      return;
    }

    const decodedToken = jwt.verify(token, secretKey) as JwtPayload & {
      userId: string;
      email: string;
      displayName: string;
    };

    
    req.userData = {
      ...decodedToken,
      _id: decodedToken.userId, 
    };

    next();
  } catch (error) {
    console.error('Error in verifyToken:', error);
    res.status(401).json({ message: 'Access restricted! Please Login!' });
  }
};


export default {
  generateToken,
  verifyToken,
};
