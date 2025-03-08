import transporter from "@/config/nodemailer";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";
import { resetPasswordOtpHtml } from "@/utils/mailoptions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const { email } = await request.json();
      if (!email) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 400 }
         );
      }

      await connectToDatabase();
      const user = await User.findOne({ email })
         .select('resetOtp resetOtpExpire lastPasswordChange');

      if (!user) {
         return NextResponse.json(
            { error: "Invalid email" },
            { status: 401 }
         );
      }

      // grater then 20 hr chnaging last password check 
      if (user.lastPasswordChange && user.lastPasswordChange > Date.now() - 20 * 60 * 60 * 1000) {
         return NextResponse.json(
            { error: "You can't reset password before 20 hours of last password change" },
            { status: 401 }
         );
      }

      const resetOtp = String(Math.floor(100000 + Math.random() * 900000));
      user.resetOtp = resetOtp;
      user.resetOtpExpire = Date.now() + 5 * 60 * 1000;
      const updatedUser = await user.save();

      // Send OTP to user's email
      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: email,
         subject: "Reset Password OTP",
         html: resetPasswordOtpHtml(updatedUser._id, updatedUser.resetOtp),
      };

      const res = await transporter.sendMail(mailOptions);
      if (!res) {
         return NextResponse.json(
            { error: "Failed to send OTP" },
            { status: 500 }
         );
      }

      return NextResponse.json(
         { message: "OTP sent to your email", },
         { status: 200 }
      );

   } catch (error) {
      return NextResponse.json(
         { error: "Authentication failed" },
         { status: 500 }
      );
   }
}