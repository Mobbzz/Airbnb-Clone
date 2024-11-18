
import mongoose, { Schema, Document } from 'mongoose';

export interface ISupportRequest extends Document {
  name: string;
  email: string;
  message: string;
}

const supportRequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export default supportRequestSchema;