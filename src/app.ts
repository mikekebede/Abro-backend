import express from "express";
import authRoutes from "./routes/auth.route"; // Adjust the path if needed

const app = express();

// Add this to parse JSON bodies
app.use(express.json());

// Use your auth routes
app.use("/api/auth", authRoutes);

export default app;
