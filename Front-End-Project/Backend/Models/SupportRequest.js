const mongoose = require('mongoose');
const supportRequestSchema = require('../schemas/SupportRequestSchema');

const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema, 'support_requests');
module.exports = SupportRequest;
