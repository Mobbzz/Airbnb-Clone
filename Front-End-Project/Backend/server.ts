import mongoose from 'mongoose';
import app from './app';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Använd CORS-middleware
app.use(cors());

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('DB connection error:', err));
