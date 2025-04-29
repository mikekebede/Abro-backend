import { Request, Response } from "express";
import Posting from "../models/posting.model";
import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getAllUsers:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
};