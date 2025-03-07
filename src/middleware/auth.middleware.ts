import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
       res.status(401).json({ message: "Unauthorized - No Token Provided" });
       return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    if (!decoded) {
       res.status(401).json({ message: "Unauthorized - Invalid Token" });
       return
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    req.user = user; // ✅ TypeScript now recognizes `req.user`
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
     res.status(500).json({ message: "Internal server error" });
     return
    }
};
