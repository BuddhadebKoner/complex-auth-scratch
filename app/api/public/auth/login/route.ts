import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { clearTokenCookie, generateToken, setTokenCookie } from "@/lib/jwt";

export const POST = async (request: NextRequest) => {
   try {
      const { email, password } = await request.json();

      console.log(email
         , password
      );

      // Generic error message for missing fields
      if (!email || !password) {
         return NextResponse.json(
            { error: "Authentication failed" },
            { status: 400 }
         );
      }

      await connectToDatabase();

      const userLogin = await User.findOne({ email });

      // Generic error messages that don't reveal which part failed
      if (!userLogin || !userLogin.isVerified || !(await bcrypt.compare(password, userLogin.password))) {

         return clearTokenCookie(
            NextResponse.json(
               { Error: "Login with Currect password" },
               { status: 200 }
            )
         );
      }

      // Generate token and update in single operation
      try {
         const token = generateToken(userLogin._id);

         // Invalidate previous tokens and update with new one
         const result = await User.findByIdAndUpdate(
            userLogin._id,
            { jwtToken: token, lastLogin: new Date() },
            { new: true }
         ).select('name email role _id');

         if (!result) {
            return NextResponse.json(
               { error: "Authentication failed" },
               { status: 500 }
            );
         }

         // Return user data without sensitive fields
         return setTokenCookie(
            NextResponse.json({
               message: "Login successful",
               user: {
                  id: result._id,
                  name: result.name,
                  email: result.email,
                  role: result.role
               }
            }, { status: 200 }),
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
         { error: "Internal server error" },
         { status: 500 }
      );
   }
};