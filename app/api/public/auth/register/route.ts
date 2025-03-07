import transporter from "@/config/nodemailer";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const { name, email, password } = await request.json();

      if (!name || !email || !password) {
         return NextResponse.json(
            { error: "Please fill all fields" },
            { status: 401 }
         )
      }

      await connectToDatabase();
      const existUser = await User.findOne({ email });
      if (existUser) {
         if (!existUser.isVarified) {
            const otp = String(Math.floor(100000 + Math.random() * 900000));
            existUser.otp = otp;
            existUser.otpExpires = Date.now() + 5 * 60 * 1000;

            await existUser.save();

            const mailOptions = {
               from: process.env.SENDER_EMAIL,
               to: email,
               subject: "Verify Your Account",
               text: `Your OTP is ${otp}`
            };
            await transporter.sendMail(mailOptions);

            return NextResponse.json(
               { message: "OTP sent to your email" },
               { status: 200 }
            )
         } else {
            return NextResponse.json(
               { error: "Account already exists" },
               { status: 401 }
            )
         }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const otp = String(Math.floor(100000 + Math.random() * 900000));

      const newUser = await User.create({
         name,
         email,
         password: hashedPassword,
         otp,
         otpExpire: Date.now() + 5 * 60 * 1000 // 5 minutes 
      });

      if (!newUser) {
         return NextResponse.json(
            { error: "Faild to register" },
            { status: 500 }
         )
      }

      // Send OTP via email
      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: email,
         subject: "Verify Your Account",
         text: `Your OTP is ${otp}`
      };
      await transporter.sendMail(mailOptions);


      return NextResponse.json(
         { message: "OTP sent to your email" },
         { status: 200 }
      )

   } catch (error) {
      console.error("Registration error:", error);
      return NextResponse.json(
         { error: "Failed to register", details: error instanceof Error ? error.message : String(error) },
         { status: 500 }
      )
   }
}