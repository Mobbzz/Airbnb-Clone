import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../Schemas/userSchema';
import dotenv from 'dotenv';
import { CustomRequest } from './types';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (user: { _id: string; email: string; displayName: string }): string => {
  return jwt.sign({ userId: user._id, email: user.email, displayName: user.displayName }, secretKey, {
    expiresIn: '1d',
  });
};

export const register = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ _id: user._id.toString(), email: user.email, displayName: user.displayName });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Access restricted! Please Login!' });
      return;
    }
    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
    (req as any).userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access restricted! Please Login!' });
  }
};

export default {
  register,
  login,
  verifyToken,
  generateToken,
};
