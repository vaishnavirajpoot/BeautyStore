import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: 'false', message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // ✅ Debug line

    if (!req.body) req.body = {}; // ✅ Prevent "undefined" error

    req.body.userId = decoded.id;
    console.log("req.body after setting userId:", req.body);

    next();
  } catch (error) {
    console.log("JWT verification error:", error); // ✅ Debug line
    res.json({ success: 'false', message: error.message });
  }
};

export default authUser;
