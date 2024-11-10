const router = require('express').Router();
const reservationModel = require('../Models/reservationModel');
const auth = require('../Authentication/auth');

// Skapa en ny reservation och säkerställ att datumen inte redan är bokade
router.post('/', auth.verifyToken, reservationModel.createNewReservation);

router.get('/', reservationModel.getReservations);

router.get('/:id', reservationModel.getReservationById);

router.put('/:id', reservationModel.updateReservation);

router.delete('/:id', reservationModel.deleteReservation);

router.get('/user/me', auth.verifyToken, reservationModel.getUserReservations);

router.get('/accommodation/:accommodationId', reservationModel.getAccommodationReservations);


module.exports = router;
