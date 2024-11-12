"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// supportRequestSchema.ts
const mongoose_1 = require("mongoose");
const supportRequestSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});
exports.default = supportRequestSchema;
