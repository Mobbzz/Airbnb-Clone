import { Request, Response } from 'express';
import User from '../Schemas/userSchema';
import bcrypt from 'bcryptjs';
import auth from '../Authentication/auth';
import { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../Authentication/types';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: 'You need to enter all the fields' });
      return;
    }

    const userExists = await User.exists({ email });

    if (userExists) {
      res.status(400).json({ message: 'The email address is already taken' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
    });

    const user = await newUser.save();
    const token = auth.generateToken({ _id: user._id.toString(), email: user.email, displayName: `${user.firstName} ${user.lastName}` });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

export const loginUserWithEmailAndPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'You need to enter all the fields' });
      return;
    }

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      res.status(401).json({ message: 'Incorrect credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Incorrect credentials' });
      return;
    }

    const token = auth.generateToken({ _id: user._id.toString(), email: user.email, displayName: `${user.firstName} ${user.lastName}` });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Unable to login', error });
  }
};

export const getUserData = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userData || !req.userData._id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { _id } = req.userData;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not get user data', error });
  }
};

export const getAllUsers = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Could not get users', error });
  }
};

export default {
  registerUser,
  loginUserWithEmailAndPassword,
  getUserData,
  getAllUsers,
};
