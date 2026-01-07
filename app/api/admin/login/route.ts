export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Call your REAL backend API
    const response = await fetch('https://akoot-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { success: false, message: data.error || 'Login failed' },
        { status: response.status }
      );
    }

    // Return the backend response format
    return Response.json({
      success: true,
      message: 'Login successful',
      token: data.data.token,
      user: data.data.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
