import { Request, Response } from "express";
import { RequestHandler } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils";
import { v2 as cloudinary } from "cloudinary";
;


export const registerUser: RequestHandler = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All Fields are required" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      return
    }
    else {
      res.status(400).json({ message: "Invalid user data" });
      return
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in signup controller:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
      return;
    }

    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" })
      return
    }
    const isPassowordCorrect = await bcrypt.compare(password, user.password)
    if (!isPassowordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" })
      return
    }
    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })

  }
  catch (error) {
    if (error instanceof Error) {
      console.error("Error in signup controller:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
      return;
    }

    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const logoutUser = (req: Request, res: Response)=> {
 try{
  res.cookie("jwt", "", {maxAge:0})
  res.status(200).json({message:"Logged out successfully"});
 }
 catch (error) {
  if (error instanceof Error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
    return;
  }

  res.status(500).json({ message: "An unexpected error occurred" });
}
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;

    if (!req.user || !("_id" in req.user)) {
      res.status(401).json({ message: "Unauthorized - User not found" });
      return;
    }
    const userId = (req.user as IUser)._id;
    

    if (!profilePic) {
     res.status(400).json({ message: "Profile pic is required" });
     return
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};

export const checkAuth=(req: Request, res: Response)=>{
  try {
    res.status(200).json(req.user);
    
  } catch (error) {
    console.log("Error in CheckAuth controller", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
}
