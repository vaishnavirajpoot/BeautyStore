import jwt from 'jsonwebtoken';

// Seller Login - /api/seller/login
export const SellerLogin = async (req, res) => {
    // console.log("Login API hit");

    const { email, password } = req.body;
   

    try {
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ id: process.env.SELLER_ID }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // console.log("Generated token:", token);

            res.cookie('sellertoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({ success: true, message: "Seller login successful" });
        } else {
            console.log("Invalid credentials");
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error in SellerLogin", error.message);
        return res.json({ success: false, message: error.message });
    }
};

// auth - /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  
  try {

    return res.json({
      success: true,
      
    });

  } catch (error) {
    console.log('Error in isAuth:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Seller Logout - /api/seller/logout
export const SellerLogout = (req, res) => {
  try {
    res.clearCookie('sellertoken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    });

    return res.json({
      success: true,
      message: 'Logout successful',
    });

  } catch (error) {
    console.log('Logout Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Logout failed, please try again later',
    });
  }
};


