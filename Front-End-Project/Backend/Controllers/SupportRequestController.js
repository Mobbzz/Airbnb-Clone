const express = require('express');
const router = express.Router();
const SupportRequest = require('../models/SupportRequest');  // Justera sökvägen vid behov

router.post('/', async (req, res) => {
    try {
        const newSupportRequest = new SupportRequest(req.body);
        const savedRequest = await newSupportRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ message: "Error creating support request", error: error });
    }
});

module.exports = router;  // Säkerställ att det är detta som exporteras
