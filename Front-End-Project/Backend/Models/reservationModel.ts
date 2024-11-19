import { Request, Response } from 'express';
import Reservation from '../Schemas/reservationSchema';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  userData?: JwtPayload & { _id: string };
}

export const createNewReservation = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log('User Data:', req.userData); // Lägg till denna rad för att logga userData
  const { accommodation, checkin, checkout } = req.body;
  const user = req.userData?._id;
  console.log('REQ BODY', req.body);
  console.log('User', user);

  if (!user || !accommodation || !checkin || !checkout) {
    res.status(400).json({
      message: 'Something went wrong',
    });
    return;
  }

  try {
    const overlappingReservation = await Reservation.findOne({
      accommodation,
      $or: [
        { checkin: { $lt: checkout }, checkout: { $gt: checkin } },
      ],
    });

    if (overlappingReservation) {
      res.status(409).json({ message: 'The selected dates are already booked' });
      return;
    }

    const newReservation = await Reservation.create({ user, accommodation, checkin, checkout });
    await newReservation.populate('accommodation');

    res.status(201).json(newReservation);
  } catch (error) {
    console.log('Error in creation of reservation', error);
    res.status(500).json({ message: 'Something went wrong when adding the reservation' });
  }
};

export const getReservations = (req: Request, res: Response): void => {
  Reservation.find()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Could not get the reservations',
      });
    });
};

export const getUserReservations = (req: CustomRequest, res: Response): void => {
  const user = req.userData?._id;
  Reservation.find({ user })
    .populate('accommodation')
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch((error) => {
      console.log('ERROR: getting user reservations', error);
      res.status(500).json({
        message: 'Could not get user reservations',
      });
    });
};

export const getAccommodationReservations = (req: Request, res: Response): void => {
  const { accommodationId } = req.params;

  Reservation.find({ accommodation: accommodationId })
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch((error) => {
      console.log('ERROR: getting accommodation reservations', error);
      res.status(500).json({
        message: 'Could not get accommodation reservations',
      });
    });
};

export const getReservationById = (req: Request, res: Response): void => {
  Reservation.findById(req.params.id)
    .then((reservation) => {
      if (!reservation) {
        res.status(404).json({ message: 'Could not find that reservation' });
        return;
      }
      res.status(200).json(reservation);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};

export const updateReservation = (req: Request, res: Response): void => {
  Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((reservation) => {
      if (!reservation) {
        res.status(404).json({ message: 'Could not find that reservation' });
        return;
      }
      res.status(200).json(reservation);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong when updating the reservation',
      });
    });
};

export const deleteReservation = (req: Request, res: Response): void => {
  Reservation.findByIdAndDelete(req.params.id)
    .then((reservation) => {
      if (!reservation) {
        res.status(404).json({ message: 'Could not find that reservation' });
        return;
      }
      res.status(200).json({ id: reservation._id });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong when deleting the reservation',
      });
    });
};