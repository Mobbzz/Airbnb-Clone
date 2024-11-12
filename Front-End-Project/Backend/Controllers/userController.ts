// userController.ts
import { Router, Request, Response } from 'express';
import userModel from '../Models/userModel';
import auth from '../Authentication/auth';

const router = Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    await userModel.registerUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    await userModel.loginUserWithEmailAndPassword(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
});

// Get user data
router.get('/me', auth.verifyToken, async (req: Request, res: Response) => {
  try {
    await userModel.getUserData(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    await userModel.getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

export default router;