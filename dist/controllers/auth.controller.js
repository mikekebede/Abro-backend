"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.updateProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../lib/utils");
const cloudinary_1 = require("cloudinary");
;
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "All Fields are required" });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: "Invalid email format" });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters" });
            return;
        }
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            // generate jwt token here
            await newUser.save();
            (0, utils_1.generateToken)(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            return;
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
            return;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in signup controller:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        const isPassowordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPassowordCorrect) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        (0, utils_1.generateToken)(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in signup controller:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in signup controller:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
exports.logoutUser = logoutUser;
const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!req.user || !("_id" in req.user)) {
            res.status(401).json({ message: "Unauthorized - User not found" });
            return;
        }
        const userId = req.user._id;
        if (!profilePic) {
            res.status(400).json({ message: "Profile pic is required" });
            return;
        }
        const uploadResponse = await cloudinary_1.v2.uploader.upload(profilePic);
        const updatedUser = await user_model_1.default.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.updateProfile = updateProfile;
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log("Error in CheckAuth controller", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.controller.js.map