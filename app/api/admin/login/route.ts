import { NextRequest, NextResponse } from 'next/server';

/**
 * Admin Login API Route
 * 
 * This is a placeholder implementation. Replace with your actual authentication logic.
 * Consider using a proper authentication service like NextAuth.js or a backend API.
 */

// TEMPORARY: For development only - replace with actual backend authentication
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // Change this!
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // SECURITY WARNING: This is a basic example. 
    // In production, use proper authentication:
    // - Hash passwords with bcrypt
    // - Use JWT tokens
    // - Store credentials in a secure database
    // - Implement rate limiting
    // - Add CSRF protection
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (replace with JWT in production)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          username,
          role: 'admin',
        },
      });
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
