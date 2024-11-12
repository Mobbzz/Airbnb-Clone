"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// userController.ts
const express_1 = require("express");
const userModel_1 = __importDefault(require("../Models/userModel"));
const auth_1 = __importDefault(require("../Authentication/auth"));
const router = (0, express_1.Router)();
// Register a new user
router.post('/register', async (req, res) => {
    try {
        await userModel_1.default.registerUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});
// Login user
router.post('/login', async (req, res) => {
    try {
        await userModel_1.default.loginUserWithEmailAndPassword(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});
// Get user data
router.get('/me', auth_1.default.verifyToken, async (req, res) => {
    try {
        await userModel_1.default.getUserData(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get user data' });
    }
});
// Get all users
router.get('/', async (req, res) => {
    try {
        await userModel_1.default.getAllUsers(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
});
exports.default = router;
