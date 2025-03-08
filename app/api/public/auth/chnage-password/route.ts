import { verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const { oldPassword, newPassword, otp } = await request.json();

      if (!oldPassword || !newPassword) {
         return NextResponse.json(
            { error: "Please fill all fields" },
            { status: 400 }
         );
      }
      // check token
      const token = request.cookies.get('token')?.value;
      if (!token) {
         return NextResponse.json(
            { error: "token not found" },
            { status: 400 }
         );
      }
      const decoded = verifyToken(token);
      if (!decoded || !decoded.id) {
         return NextResponse.json(
            { error: "Token not veryfied" },
            { status: 400 }
         );
      }

      // check user is exist
      const user = await User.findById(decoded.id)
         .select('otp ,otpExpire, password, lastPasswordChange');
      if (!user) {
         return NextResponse.json(
            { error: "User is not exist !" },
            { status: 400 }
         );
      }

      // check the last password change
      if (user.lastPasswordChange && user.lastPasswordChange > Date.now() - 20 * 60 * 60 * 1000) {
         return NextResponse.json(
            { error: "You can't reset password before 20 hours of last password change" },
            { status: 401 }
         );
      }

      // check otp
      if (!user.otp || user.otp !== otp) {
         return NextResponse.json(
            { error: "Invalid OTP" },
            { status: 400 }
         );
      }
      // check otp expire
      if (user.otpExpire < Date.now()) {
         return NextResponse.json(
            { error: "OTP Expired" },
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
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
};