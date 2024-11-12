import { Router, Response, Request } from 'express';
import { CustomRequest } from '../Authentication/types';
import * as reservationModel from '../Models/reservationModel';
import auth from '../Authentication/auth';

const router = Router();

router.post('/', auth.verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.createNewReservation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.getReservations(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reservations' });
  }
});

router.get('/:id', async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.getReservationById(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reservation' });
  }
});

router.put('/:id', auth.verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.updateReservation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
});

router.delete('/:id', auth.verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.deleteReservation(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

router.get('/user/me', auth.verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.getUserReservations(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user reservations' });
  }
});

router.get('/accommodation/:accommodationId', async (req: CustomRequest, res: Response) => {
  try {
    await reservationModel.getAccommodationReservations(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accommodation reservations' });
  }
});

export default router;