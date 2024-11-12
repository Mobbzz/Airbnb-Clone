// supportRequestModel.ts
import mongoose from 'mongoose';
import supportRequestSchema from '../Schemas/SupportRequestSchema';

const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema, 'support_requests');

export default SupportRequest;
