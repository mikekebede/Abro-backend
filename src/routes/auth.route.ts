import express from "express";
import { registerUser, loginUser, logoutUser, updateProfile, checkAuth } from "../controllers/auth.controller";  // Adjust the path if needed
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/register", registerUser);  // Ensure this matches your intended route
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-profile", protectRoute,updateProfile)
router.get("/check", protectRoute,checkAuth)

export default router;