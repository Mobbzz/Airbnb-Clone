"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// supportRequestModel.ts
const mongoose_1 = __importDefault(require("mongoose"));
const SupportRequestSchema_1 = __importDefault(require("../Schemas/SupportRequestSchema"));
const SupportRequest = mongoose_1.default.model('SupportRequest', SupportRequestSchema_1.default, 'support_requests');
exports.default = SupportRequest;
