import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getAllUsers } from '../controllers/community.controller';
import { get } from 'http';
const router = express.Router();

router.get("/", protectRoute, getAllUsers)


export default router;