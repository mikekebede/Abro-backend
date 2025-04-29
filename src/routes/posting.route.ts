import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getPostings, createPosting } from '../controllers/posting.controller';
const router = express.Router();

router.get("/", protectRoute, getPostings)
router.post("/createPost", protectRoute, createPosting)

export default router;