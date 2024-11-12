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
Object.defineProperty(exports, "__esModule", { value: true });
// accommodationController.ts
const express_1 = require("express");
const accommodationModel = __importStar(require("../Models/accommodationModel"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        await accommodationModel.createNewAccommodation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create accommodation' });
    }
});
router.get('/', async (req, res) => {
    try {
        await accommodationModel.getAccommodations(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get accommodations' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        await accommodationModel.getAccommodationById(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get accommodation' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        await accommodationModel.updateAccommodation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update accommodation' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await accommodationModel.deleteAccommodation(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete accommodation' });
    }
});
exports.default = router;
