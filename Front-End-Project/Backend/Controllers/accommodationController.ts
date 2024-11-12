// accommodationController.ts
import { Router, Request, Response } from 'express';
import * as accommodationModel from '../Models/accommodationModel';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    await accommodationModel.createNewAccommodation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create accommodation' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await accommodationModel.getAccommodations(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accommodations' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await accommodationModel.getAccommodationById(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accommodation' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await accommodationModel.updateAccommodation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update accommodation' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await accommodationModel.deleteAccommodation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete accommodation' });
  }
});

export default router;
