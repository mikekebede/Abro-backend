import express from "express";
import authRoutes from "./routes/auth.route"; // Adjust the path if needed
import postingRoutes from "./routes/posting.route";
import messageRoutes from "./routes/message.route"
import communityRoutes from "./routes/community.route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()); // ✅ Ensures cookies are parsed correctly

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postingRoutes);
app.use("/api/community", communityRoutes);

export default app;
