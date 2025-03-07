import jwt from "jsonwebtoken"
import mongoose, { ObjectId } from "mongoose"
import { Response } from "express";


export const generateToken= (userId:mongoose.Types.ObjectId,res:Response)=> {
    const jwtSecret= process.env.JWT_SECRET as string;

    if(!jwtSecret){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }


    const token=jwt.sign({userId}, jwtSecret, {expiresIn:"7d"})

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //7D in millisecond
        httpOnly:true, //prevent XSS attacks across cross-ste scripting attacks
        sameSite:"strict", // CSRF attacks cross site reuest forgery attacks
        secure:process.env.NODE_ENV!=="development"
    })

    return token
}