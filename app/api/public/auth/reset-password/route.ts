import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const { email, newPassword, otp } = await request.json();

      if (!email || !newPassword) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 400 }
         );
      }

      await connectToDatabase();
      // check user is exist
      const user = await User.findOne({ email })
         .select('resetOtp resetOtpExpires password');

      if (!user) {
         return NextResponse.json(
            { error: "User is not exist !" },
            { status: 400 }
         );
      }

      // check otp
      if (!user.resetOtp || user.resetOtp !== otp) {
         return NextResponse.json(
            { error: "Invalid OTP" },
            { status: 400 }
         );
      }
      // check otp expire
      if (user.resetOtpExpire < Date.now()) {
         return NextResponse.json(
            { error: "OTP Expired" },
            { status: 400 }
         );
      }
      // decode old password and match with new password
      const isMatchedWithOldPassword = await bcrypt.compare(newPassword, user.password);
      if (isMatchedWithOldPassword) {
         return NextResponse.json(
            { error: "Try With Another password !" },
            { status: 400 }
         );
      }


      // hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (!hashedPassword) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
         );
      }
      user.password = hashedPassword;
      user.resetOtp = null;
      user.resetOtpExpire = null;
      user.otp = null;
      user.otpExpire = null;
      user.jwtToken = null;
      user.lastPasswordChange = new Date();
      const updadatedUser = await user.save();
      if (!updadatedUser) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
         );
      }

      return NextResponse.json(
         { message: "Password reset successfully" },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: "Authentication failed" },
         { status: 500 }
      );
   }
}