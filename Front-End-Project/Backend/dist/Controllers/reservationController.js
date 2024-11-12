"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationModel = __importStar(require("../Models/reservationModel"));
const auth_1 = __importDefault(require("../Authentication/auth"));
const router = (0, express_1.Router)();
router.post('/', auth_1.default.verifyToken, async (req, res) => {
    try {
        await reservationModel.createNewReservation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});
router.get('/', async (req, res) => {
    try {
        await reservationModel.getReservations(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get reservations' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        await reservationModel.getReservationById(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get reservation' });
    }
});
router.put('/:id', auth_1.default.verifyToken, async (req, res) => {
    try {
        await reservationModel.updateReservation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update reservation' });
    }
});
router.delete('/:id', auth_1.default.verifyToken, async (req, res) => {
    try {
        await reservationModel.deleteReservation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
});
router.get('/user/me', auth_1.default.verifyToken, async (req, res) => {
    try {
        await reservationModel.getUserReservations(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get user reservations' });
    }
});
router.get('/accommodation/:accommodationId', async (req, res) => {
    try {
        await reservationModel.getAccommodationReservations(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get accommodation reservations' });
    }
});
exports.default = router;
