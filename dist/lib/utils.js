"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: "7d" });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7D in millisecond
        httpOnly: true, //prevent XSS attacks across cross-ste scripting attacks
        sameSite: "strict", // CSRF attacks cross site reuest forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=utils.js.map