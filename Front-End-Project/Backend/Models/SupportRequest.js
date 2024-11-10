const mongoose = require('mongoose');
const SupportRequestSchema = require('../Schemas/SupportRequestSchema');

const SupportRequest = mongoose.model('SupportRequest', SupportRequestSchema, 'support_requests');
module.exports = SupportRequest;
