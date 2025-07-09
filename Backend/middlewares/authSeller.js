import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
  const { sellertoken } = req.cookies;

  if (!sellertoken) {
    return res.json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);

    req.user = decoded; 
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authSeller;
