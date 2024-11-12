// accommodationModel.ts
import { Request, Response } from 'express';
import Accommodation from '../Schemas/accommodationSchema';

export const createNewAccommodation = (req: Request, res: Response): void => {
  const { title, host, location, description, price, imageUrl } = req.body;
  const images = req.body.images || [];

  if (!title || !host || !location || !description || !price || !imageUrl) {
    res.status(400).json({
      message: 'You need to enter all the fields',
    });
    return;
  }

  Accommodation.create({ title, host, location, description, price, imageUrl, images })
    .then((data) => res.status(201).json(data))
    .catch(() => res.status(500).json({ message: 'Something went wrong when adding the accommodation' }));
};

export const getAccommodations = (req: Request, res: Response): void => {
  Accommodation.find()
    .then((accommodations) => {
      res.status(200).json(accommodations);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Could not get the accommodations',
      });
    });
};

export const getAccommodationById = (req: Request, res: Response): void => {
  Accommodation.findById(req.params.id)
    .then((accommodation) => {
      if (!accommodation) {
        res.status(404).json({ message: 'Could not find that accommodation' });
        return;
      }
      res.status(200).json(accommodation);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};

export const updateAccommodation = (req: Request, res: Response): void => {
  Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((accommodation) => {
      if (!accommodation) {
        res.status(404).json({ message: 'Could not find that accommodation' });
        return;
      }
      res.status(200).json(accommodation);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong when updating the accommodation',
      });
    });
};

export const deleteAccommodation = (req: Request, res: Response): void => {
  Accommodation.findByIdAndDelete(req.params.id)
    .then((accommodation) => {
      if (!accommodation) {
        res.status(404).json({ message: 'Could not find that accommodation' });
        return;
      }
      res.status(200).json({ id: accommodation._id });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong when deleting the accommodation',
      });
    });
};