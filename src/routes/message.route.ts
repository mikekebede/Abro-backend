import express from "express"
import { protectRoute } from "src/middleware/auth.middleware";
import { getUsersForSidebar } from "src/controllers/message.controllers";
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar)


export default router;