import { Request, Response } from "express";
import Posting from "../models/posting.model";
import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const getPostings = async (req: Request, res: Response) => {
    try {
        const postings = await Posting.find().populate("creatorID", "name email");

        res.status(200).json(postings);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getPostings:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
}
export const createPosting = async (req: Request, res: Response) => {
    try {
        const { serviceTitle,
            budget,
            deadline,
            skills,
            location,
            fullDescription,
            contactInfo,
            preferredQualifications,
            attachments } = req.body;
        const creatorID = req.user?._id;
        let attachmentUrl;
        if (attachments) {
            console.log("Attachments received:", attachments);
            try {
                const uploadResponse = await cloudinary.uploader.upload(attachments);
                attachmentUrl = uploadResponse.secure_url;
                console.log("Cloudinary upload response:", uploadResponse);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error uploading to Cloudinary:", error);
                    res.status(500).json({ message: "Error uploading attachment", error: error.message });
                    return;
                }
            }
        }
        const newPosting = new Posting({
            creatorID,
            serviceTitle,
            budget,
            deadline,
            skills,
            location,
            fullDescription,
            contactInfo,
            preferredQualifications,
            attachments: attachmentUrl,
        });
        try {
            await newPosting.save();
            console.log(
                `New posting created by ${creatorID} with title ${serviceTitle}`
            )
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error saving to database:", error);
                res.status(500).json({ message: "Error saving posting", error: error.message });
                return;
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in createPosting:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }

}
