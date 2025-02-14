import express from "express";
import authRoutes from "./routes/auth.route"; // Adjust the path if needed
import cookieParser from "cookie-parser";

const app = express();

// ✅ Parse JSON and URL-encoded data (important for form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Ensures cookies are parsed correctly

// ✅ Use authentication routes
app.use("/api/auth", authRoutes);

export default app;
