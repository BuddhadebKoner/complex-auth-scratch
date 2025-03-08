import transporter from "@/config/nodemailer";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";
import { registerOtpHtml } from "@/utils/mailoptions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const token = request.cookies.get('token')?.value;
      if (!token) {
         return NextResponse.json(
            { error: "Unauthorized Activity , dont do that" },
            { status: 400 }
         );
      }
      const decoded = verifyToken(token);

      if (!decoded || !decoded.id) {
         return NextResponse.json(
            { error: "Unauthorized Activity , dont do that" },
            { status: 400 }
         );
      }

      const user = await User.findById(decoded.id).select('email name');
      if (!user) {
         return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
         )
      }

      // Generate OTP
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      user.otp = otp;
      user.otpExpire = Date.now() + 5 * 60 * 1000;
      const res = await user.save();
      if (!res) {
         return NextResponse.json(
            { error: "Failed to send OTP" },
            { status: 500 }
         )
      }

      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: user.email,
         subject: "Verify Your Account",
         html: registerOtpHtml(user.name, otp),
      };

      const sendingMail = await transporter.sendMail(mailOptions);
      if (!sendingMail) {
         return NextResponse.json(
            { error: "Failed to send OTP" },
            { status: 500 }
         )
      }

      return NextResponse.json(
         { message: "OTP sent to your email" },
         { status: 200 }
      )

   } catch (error) {
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      )
   }
};