import mongoose from "mongoose";

export interface IUser {
   name: string;
   email: string;
   password: string;
   phone: string;
   address: string;
   role: string;
   otp: string;
   otpExpire: number;  
   resetOtp: string;
   resetOtpExpire: number;  
   isVerified: boolean;
   imageUrl: string;
   imageId: string;
   orders: mongoose.Types.ObjectId[];
   cart: mongoose.Types.ObjectId[];
   products: mongoose.Types.ObjectId[];
   favorite: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      unique: true,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      required: true,
      enum: ["admin", "customer", "seller"],
      default: "customer",
   },
   otp: {
      type: String,
      default: "",
   },
   otpExpire: {
      type: Number,
      default: 0,
   },
   resetOtp: {
      type: String,
      default: "",
   },
   resetOtpExpire: {
      type: Number,
      default: 0,
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
   imageUrl: {
      type: String,
      default: "",
   },
   imageId: {
      type: String,
      default: "",
   },
   orders: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Order",
      },
   ],
   cart: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Cart",
      },
   ],
   products: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Product",
      },
   ],
   favorite: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Product",
      },
   ],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;