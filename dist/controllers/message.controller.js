"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessages = exports.getUsersForSidebar = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const socket_1 = require("../lib/socket");
const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user?._id;
        const filteredUsers = await user_model_1.default.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getUsersForSidebar:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
};
exports.getUsersForSidebar = getUsersForSidebar;
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user?._id;
        const messages = await message_model_1.default.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        });
        res.status(200).json(messages);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getMessages:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
};
exports.getMessages = getMessages;
const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary_1.default.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new message_model_1.default({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        //realtime functionality goes here
        res.status(201).json(newMessage);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in sendMessage Controller:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=message.controller.js.map