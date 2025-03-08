import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

// Get expiration time from environment or use default
const getExpirationTime = (): number => {
  if (!process.env.JWT_EXPIRE) {
    // Default to 7 days in seconds
    return 7 * 24 * 60 * 60;
  }
  return parseInt(process.env.JWT_EXPIRE);
};

// Generate JWT token
export const generateToken = (userId: string | Types.ObjectId): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT environment variables are not set');
  }
  
  const expiresIn = getExpirationTime();
  
  return jwt.sign(
    { 
      id: userId,
      iat: Math.floor(Date.now() / 1000) // issued at time
    }, 
    process.env.JWT_SECRET, 
    { expiresIn }
  );
};

// Set token in cookie and return response
export const setTokenCookie = (response: NextResponse, token: string): NextResponse => {
  // Convert JWT expiration from seconds to milliseconds for cookie
  const maxAge = getExpirationTime() * 1000;
  
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    sameSite: 'lax', // Changed from 'none' to 'lax' for better security
    maxAge,
    path: '/',
    partitioned: true
  });
  
  return response;
};

// Verify JWT token
export const verifyToken = (token: string): { id: string; iat: number } | null => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }
    
    return jwt.verify(token, process.env.JWT_SECRET) as { id: string; iat: number };
  } catch (error) {
    return null;
  }
};

// Clear token cookie (for logout)
export const clearTokenCookie = (response: NextResponse): NextResponse => {
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
    sameSite: 'lax'
  });
  
  return response;
};