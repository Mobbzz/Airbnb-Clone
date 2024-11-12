"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getAccommodationReservations = exports.getUserReservations = exports.getReservations = exports.createNewReservation = void 0;
const reservationSchema_1 = __importDefault(require("../Schemas/reservationSchema"));
const createNewReservation = async (req, res) => {
    const { accommodation, checkin, checkout } = req.body;
    const user = req.userData?._id;
    console.log('REQ BODY', req.body);
    if (!user || !accommodation || !checkin || !checkout) {
        res.status(400).json({
            message: 'You need to enter all the fields',
        });
        return;
    }
    try {
        const overlappingReservation = await reservationSchema_1.default.findOne({
            accommodation,
            $or: [
                { checkin: { $lt: checkout }, checkout: { $gt: checkin } },
            ],
        });
        if (overlappingReservation) {
            res.status(409).json({ message: 'The selected dates are already booked' });
            return;
        }
        const newReservation = await reservationSchema_1.default.create({ user, accommodation, checkin, checkout });
        await newReservation.populate('accommodation');
        res.status(201).json(newReservation);
    }
    catch (error) {
        console.log('Error in creation of reservation', error);
        res.status(500).json({ message: 'Something went wrong when adding the reservation' });
    }
};
exports.createNewReservation = createNewReservation;
const getReservations = (req, res) => {
    reservationSchema_1.default.find()
        .then((reservations) => {
        res.status(200).json(reservations);
    })
        .catch(() => {
        res.status(500).json({
            message: 'Could not get the reservations',
        });
    });
};
exports.getReservations = getReservations;
const getUserReservations = (req, res) => {
    const user = req.userData?._id;
    reservationSchema_1.default.find({ user })
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
exports.getUserReservations = getUserReservations;
const getAccommodationReservations = (req, res) => {
    const { accommodationId } = req.params;
    reservationSchema_1.default.find({ accommodation: accommodationId })
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
exports.getAccommodationReservations = getAccommodationReservations;
const getReservationById = (req, res) => {
    reservationSchema_1.default.findById(req.params.id)
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
exports.getReservationById = getReservationById;
const updateReservation = (req, res) => {
    reservationSchema_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => {
    reservationSchema_1.default.findByIdAndDelete(req.params.id)
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
exports.deleteReservation = deleteReservation;
