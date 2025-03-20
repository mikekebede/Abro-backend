import { Request, Response } from 'express'
import User from '../models/user.model';
import Message from "../models/message.model"
import cloudinary from '../lib/cloudinary';

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.user?._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers);

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getUsersForSidebar:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;

        }
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user?._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getMessages:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();

        //realtime functionality goes here
        res.status(201).json(newMessage)

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in sendMessage Controller:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;

        }
    }
}