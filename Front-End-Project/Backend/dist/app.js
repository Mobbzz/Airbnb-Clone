"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = __importDefault(require("./Controllers/userController"));
const accommodationController_1 = __importDefault(require("./Controllers/accommodationController"));
const reservationController_1 = __importDefault(require("./Controllers/reservationController"));
const SupportRequestController_1 = __importDefault(require("./Controllers/SupportRequestController"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true })); // updated from false to true to better handle deep object parsing
app.use(express_1.default.json());
// Controllers
app.use('/api/users', userController_1.default);
app.use('/api/accommodations', accommodationController_1.default);
app.use('/api/reservations', reservationController_1.default);
app.use('/api/support', SupportRequestController_1.default);
exports.default = app;
