// accommodationSchema.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAccommodation extends Document {
  title: string;
  host: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
}

const accommodationSchema: Schema = new Schema({
  title: { type: String, required: true },
  host: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  images: [{ type: String }],
});

export default mongoose.model<IAccommodation>('Accommodation', accommodationSchema);
