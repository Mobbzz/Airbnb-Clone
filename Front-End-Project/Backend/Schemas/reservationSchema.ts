
import mongoose, { Schema, Document } from 'mongoose';
import { IAccommodation } from './accommodationSchema';
import { IUser } from './userSchema';

export interface IReservation extends Document {
  user: IUser['_id'];
  accommodation: IAccommodation['_id'];
  checkin: string;
  checkout: string;
}

const reservationSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accommodation: {
    type: Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true,
  },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);
