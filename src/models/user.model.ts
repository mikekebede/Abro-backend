import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for User
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}
// Create Mongoose schema
const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create and export User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
