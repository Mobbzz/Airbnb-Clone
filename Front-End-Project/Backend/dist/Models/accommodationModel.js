"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccommodation = exports.updateAccommodation = exports.getAccommodationById = exports.getAccommodations = exports.createNewAccommodation = void 0;
const accommodationSchema_1 = __importDefault(require("../Schemas/accommodationSchema"));
const createNewAccommodation = (req, res) => {
    const { title, host, location, description, price, imageUrl } = req.body;
    const images = req.body.images || [];
    if (!title || !host || !location || !description || !price || !imageUrl) {
        res.status(400).json({
            message: 'You need to enter all the fields',
        });
        return;
    }
    accommodationSchema_1.default.create({ title, host, location, description, price, imageUrl, images })
        .then((data) => res.status(201).json(data))
        .catch(() => res.status(500).json({ message: 'Something went wrong when adding the accommodation' }));
};
exports.createNewAccommodation = createNewAccommodation;
const getAccommodations = (req, res) => {
    accommodationSchema_1.default.find()
        .then((accommodations) => {
        res.status(200).json(accommodations);
    })
        .catch(() => {
        res.status(500).json({
            message: 'Could not get the accommodations',
        });
    });
};
exports.getAccommodations = getAccommodations;
const getAccommodationById = (req, res) => {
    accommodationSchema_1.default.findById(req.params.id)
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
exports.getAccommodationById = getAccommodationById;
const updateAccommodation = (req, res) => {
    accommodationSchema_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
exports.updateAccommodation = updateAccommodation;
const deleteAccommodation = (req, res) => {
    accommodationSchema_1.default.findByIdAndDelete(req.params.id)
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
exports.deleteAccommodation = deleteAccommodation;
