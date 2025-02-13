import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller";  // Adjust the path if needed

const router = express.Router();

router.post("/register", registerUser);  // Ensure this matches your intended route
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;