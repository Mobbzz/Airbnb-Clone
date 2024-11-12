"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.register = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = __importDefault(require("../Schemas/userSchema"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, displayName: user.displayName }, secretKey, {
        expiresIn: '1d',
    });
};
exports.generateToken = generateToken;
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new userSchema_1.default({
            username,
            email,
            passwordHash: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema_1.default.findOne({ email }).select('+passwordHash');
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const token = (0, exports.generateToken)({ _id: user._id.toString(), email: user.email, displayName: user.displayName });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log in' });
    }
};
exports.login = login;
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Access restricted! Please Login!' });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Access restricted! Please Login!' });
    }
};
exports.verifyToken = verifyToken;
exports.default = {
    register: exports.register,
    login: exports.login,
    verifyToken: exports.verifyToken,
    generateToken: exports.generateToken,
};
