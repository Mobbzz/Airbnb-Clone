"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// supportRequestController.ts
const express_1 = require("express");
const SupportRequest_1 = __importDefault(require("../Models/SupportRequest"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const newSupportRequest = new SupportRequest_1.default(req.body);
        const savedRequest = await newSupportRequest.save();
        res.status(201).json(savedRequest);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating support request', error });
    }
});
exports.default = router;
