import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const { oldPassword, newPassword, otp } = await request.json();

      if (!oldPassword || !newPassword) {
         return NextResponse.json(
            { error: "Please provide both old and new passwords" },
            { status: 400 }
         );
      }

      await connectToDatabase();

      // Get token with detailed logging
      const token = request.cookies.get('token')?.value;
      console.log("Token received:", token ? "Token exists" : "No token");
      
      if (!token) {
         return NextResponse.json(
            { error: "Authentication token not found. Please log in again." },
            { status: 401 }
         );
      }

      // Verify with detailed error handling
      const decoded = verifyToken(token);
      
      if (!decoded) {
         return NextResponse.json(
            { error: "Invalid or expired token. Please log in again." },
            { status: 401 }
         );
      }

      if (!decoded.id) {
         return NextResponse.json(
            { error: "Token is missing required user information" },
            { status: 400 }
         );
      }

      // Check user exists with proper error handling
      const user = await User.findById(decoded.id)
         .select('otp otpExpire password lastPasswordChange');
      
      if (!user) {
         return NextResponse.json(
            { error: "User account not found" },
            { status: 404 }
         );
      }

      // Check the last password change
      if (user.lastPasswordChange && user.lastPasswordChange > Date.now() - 20 * 60 * 60 * 1000) {
         return NextResponse.json(
            { error: "You can't reset password before 20 hours of last password change" },
            { status: 401 }
         );
      }

      // Verify OTP
      if (!otp) {
         return NextResponse.json(
            { error: "OTP is required for password change" },
            { status: 400 }
         );
      }
      
      if (!user.otp || user.otp !== otp) {
         return NextResponse.json(
            { error: "Invalid OTP" },
            { status: 400 }
         );
      }
      
      // Check OTP expiration
      if (!user.otpExpire || user.otpExpire < Date.now()) {
         return NextResponse.json(
            { error: "OTP has expired. Please request a new one." },
            { status: 400 }
         );
      }

      // Verify old password before setting new one
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
         return NextResponse.json(
            { error: "Current password is incorrect" },
            { status: 401 }
         );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update user details
      user.password = hashedPassword;
      user.otp = null;
      user.otpExpire = null;
      user.lastPasswordChange = Date.now();
      
      const updatedUser = await user.save();
      if (!updatedUser) {
         return NextResponse.json(
            { error: "Failed to update password" },
            { status: 500 }
         );
      }
      
      return NextResponse.json(
         { message: "Password updated successfully" },
         { status: 200 }
      );

   } catch (error) {
      console.error("Password change error:", error);
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
};