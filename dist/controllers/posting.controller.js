"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPosting = exports.getPostings = void 0;
const posting_model_1 = __importDefault(require("../models/posting.model"));
const cloudinary_1 = __importDefault(require("src/lib/cloudinary"));
const getPostings = async (req, res) => {
    try {
        const postings = await posting_model_1.default.find().populate("creatorID", "name email");
        res.status(200).json(postings);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getPostings:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
};
exports.getPostings = getPostings;
const createPosting = async (req, res) => {
    try {
        const { serviceTitle, budget, deadline, skills, location, fullDescription, contactInfo, preferredQualifications, attachments } = req.body;
        const creatorID = req.user?._id;
        let attachmentUrl;
        if (attachments) {
            const uploadResponse = await cloudinary_1.default.uploader.upload(attachments);
            attachmentUrl = uploadResponse.secure_url;
        }
        const newPosting = new posting_model_1.default({
            creatorID,
            serviceTitle,
            budget,
            deadline,
            skills,
            location,
            fullDescription,
            contactInfo,
            preferredQualifications,
            attachments: attachmentUrl
        });
        await newPosting.save();
        res.status(201).json(newPosting);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in createPosting:", error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
            return;
        }
    }
};
exports.createPosting = createPosting;
//# sourceMappingURL=posting.controller.js.map