
import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';  

export const Register = async (req, res) => {

   try{
     const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.json({success:'false', message: "All fields are required" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.json({success:'false', message: "User already exists" });
    }

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({name, email, password: hashedPassword});

const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

res.cookie('token',token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'strict',

    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})
return res.json({success:"true",user:{
    email:user.email,
    name:user.name,
}})

   }catch(error){
    console.log("Error in Register",error.message);
     res.json({success:'false', message: error.message });

   }


}

export const Login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password)
            return res.json({success:'false', message: "All fields are required" });

        const user = await User.findOne({email});
        if(!user){
            return res.json({success:'false', message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:'false', message: "Invalid credentials" });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

res.cookie('token',token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'strict',

    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})
return res.json({success:"true",user:{
    email:user.email,
 
}})


}catch(error){
         console.log(error.message);
     res.json({success:'false', message: error.message });

    }
}




export const isAuth = async (req, res) => {
  try {
    const userId =  req.body.userId; 
console.log("User ID from request:", userId); // ✅ Debug line
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user ID found',
      });
    }

    const user = await User.findById(userId).select('-password'); // 👈 exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log('Error in isAuth:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};



export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
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



