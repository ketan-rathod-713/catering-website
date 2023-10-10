import cookie from 'cookie';

export default function authMiddleware(handler) {
  return async (req, res) => {
    // Get the token from the cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token; // Replace 'yourTokenName' with your actual cookie name

    // Check if the token exists and is valid (you can add your own validation logic here)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Pass the token to the handler
    req.token = token;

    return handler(req, res);
  };
}
