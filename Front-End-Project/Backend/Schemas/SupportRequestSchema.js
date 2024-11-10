const mongoose = require('mongoose');

const supportRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = supportRequestSchema;
