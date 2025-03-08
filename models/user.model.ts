import mongoose from "mongoose";

export interface IUser {
   name: string;
   email: string;
   password: string;
   phone: string;
   address: string;
   role: string;
   otp: string;
   otpExpire: string;
   resetOtp: string;
   resetOtpExpire: string;
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
      default: "",
   },
   address: {
      type: String,
      default: "",
   },
   role: {
      type: String,
      enum: ["admin", "customer", "seller"],
      default: "customer",
   },
   otp: {
      type: String,
      default: "",
   },
   otpExpire: {
      type: Date,
      default: null,
   },
   resetOtp: {
      type: String,
      default: "",
   },
   resetOtpExpire: {
      type: Date,
      default: null,
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
   jwtToken: {
      type: String,
      default: "",
   },
   lastLogin: {
      type: Date,
      default: "",
   },
   lastLogout: {
      type: Date,
      default: "",
   },
   lastPasswordChange: {
      type: Date,
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