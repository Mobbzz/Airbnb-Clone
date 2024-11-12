// supportRequestController.ts
import { Router, Request, Response } from 'express';
import SupportRequest from '../Models/SupportRequest';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newSupportRequest = new SupportRequest(req.body);
    const savedRequest = await newSupportRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error creating support request', error });
  }
});

export default router;
