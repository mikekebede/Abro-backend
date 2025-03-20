import express from "express";
import authRoutes from "./routes/auth.route"; // Adjust the path if needed
import messageRoutes from "./routes/message.route"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// ✅ Parse JSON and URL-encoded data (important for form submissions)
 // Increase payload limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()); // ✅ Ensures cookies are parsed correctly

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// ✅ Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
