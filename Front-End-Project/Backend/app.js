const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));  // updated from false to true to better handle deep object parsing
app.use(express.json());

// Controllers
app.use('/api/users', require('./Controllers/userController'));
app.use('/api/accommodations', require('./Controllers/accommodationController'));
app.use('/api/reservations', require('./Controllers/reservationController'));
// Include support request route
app.use('/api/support', require('./Controllers/SupportRequestController'));

module.exports = app;
