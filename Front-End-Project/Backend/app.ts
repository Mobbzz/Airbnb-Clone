import express from 'express';
import cors from 'cors';
import userController from './Controllers/userController';
import accommodationController from './Controllers/accommodationController';
import reservationController from './Controllers/reservationController';
import supportRequestController from './Controllers/SupportRequestController';

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Controllers
app.use('/api/users', userController);
app.use('/api/accommodations', accommodationController);
app.use('/api/reservations', reservationController);  
app.use('/api/support', supportRequestController);  

export default app;
