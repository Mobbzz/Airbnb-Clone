"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Använd CORS-middleware
app_1.default.use((0, cors_1.default)());
const PORT = process.env.PORT || 3030;
app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('DB connection error:', err));
