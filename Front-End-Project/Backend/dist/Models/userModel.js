"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserData = exports.loginUserWithEmailAndPassword = exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../Schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../Authentication/auth"));
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'You need to enter all the fields' });
            return;
        }
        const userExists = await userSchema_1.default.exists({ email });
        if (userExists) {
            res.status(400).json({ message: 'The email address is already taken' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new userSchema_1.default({
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
        });
        const user = await newUser.save();
        const token = auth_1.default.generateToken({ _id: user._id.toString(), email: user.email, displayName: `${user.firstName} ${user.lastName}` });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
};
exports.registerUser = registerUser;
const loginUserWithEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'You need to enter all the fields' });
            return;
        }
        const user = await userSchema_1.default.findOne({ email }).select('+passwordHash');
        if (!user) {
            res.status(401).json({ message: 'Incorrect credentials' });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect credentials' });
            return;
        }
        const token = auth_1.default.generateToken({ _id: user._id.toString(), email: user.email, displayName: `${user.firstName} ${user.lastName}` });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to login', error });
    }
};
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
const getUserData = async (req, res) => {
    try {
        if (!req.userData) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { _id } = req.userData;
        const user = await userSchema_1.default.findById(_id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Could not get user data', error });
    }
};
exports.getUserData = getUserData;
const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Could not get users', error });
    }
};
exports.getAllUsers = getAllUsers;
exports.default = {
    registerUser: exports.registerUser,
    loginUserWithEmailAndPassword: exports.loginUserWithEmailAndPassword,
    getUserData: exports.getUserData,
    getAllUsers: exports.getAllUsers,
};
