import { verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      const token = request.cookies.get('token')?.value;
      if (!token) {
         return NextResponse.json(
            { error: "Not Authenticated" },
            { status: 401 }
         );
      }

      const decoded = verifyToken(token);

      if (decoded && decoded.id) {
         const user = await User.findOne({ _id: decoded.id })
            .select('-password -__v -favorite -products -cart -orders -jwtToken -resetOtpExpire -resetOtp -otpExpire -otp')
            .lean()
            .exec()

         if (!user) {
            return NextResponse.json(
               { error: "Unauthorized Activity !" },
               { status: 404 }
            );
         }
         return NextResponse.json(
            {
               message: "Authenticated",
               user: user
            },
            { status: 200 },
         );
      }

      return NextResponse.json(
         { error: "Not Authenticated" },
         { status: 401 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}