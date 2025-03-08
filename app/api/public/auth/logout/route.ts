import { clearTokenCookie, verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
      // Get the token from cookies
      const token = request.cookies.get('token')?.value;
      // console.log(token);
      // If token exists, invalidate it in the database
      if (token) {
         const decoded = verifyToken(token);

         if (decoded && decoded.id) {
            await User.findByIdAndUpdate(
               decoded.id,
               { jwtToken: null, lastLogout: new Date() },
               { new: true }
            );
         }
      }
      if (!token) {
         return NextResponse.json(
            { error: "Unauthorized Activity , dont do that" },
            { status: 400 }
         );
      };

      // Clear the cookie regardless of token validity
      return clearTokenCookie(
         NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
         )
      );
   } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
};