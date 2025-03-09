import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user.model";
import { connectToDatabase } from "@/lib/db";
import { generateToken, setTokenCookie } from "@/lib/jwt";

export const POST = async (request: NextRequest) => {
   try {
      const { email, otp } = await request.json();
      if (!email || !otp) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 400 }
         );
      }

      await connectToDatabase();

      // check user exists
      const user = await User.findOne({ email })
         .select('otp otpExpire');

      if (!user) {
         return NextResponse.json(
            { error: "User is not exist !" },
            { status: 400 }
         );
      }

      // check otp
      if (!user.otp || user.otp !== otp) {
         return NextResponse.json(
            { error: "Invalid OTP" },
            { status: 400 }
         );
      };
      // check otp expire
      if (user.otpExpire < Date.now()) {
         return NextResponse.json(
            { error: "OTP Expired" },
            { status: 400 }
         );
      }

      try {
         const token = generateToken(user._id);
         if (!token) {
            return NextResponse.json(
               { error: "Authentication failed" },
               { status: 500 }
            );
         }


         // Invalidate previous tokens and update with new one
         const result = await User.findByIdAndUpdate(
            user._id,
            {
               isVerified: true,
               otp: '',
               otpExpire: '',
               jwtToken: token,
               lastLogin: Date.now()
            },
            { new: true }
         ).select('name email role _id');

         if (!result) {
            return NextResponse.json(
               { error: "Authentication failed" },
               { status: 500 }
            );
         }

         //   return and set cookie
         return setTokenCookie(
            NextResponse.json(
               { message: "Email verified successfully", },
               { status: 200 }
            ),
            token
         );

      } catch (error) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
         );
      }

   } catch (error) {
      return NextResponse.json(
         { error: "Authentication failed" },
         { status: 500 }
      );
   }
};