import User from '../models/User.js';


export const UpdateCart = async (req, res) => {
   try{
     const{ userId,cartItems } = req.body;
    const cart  =  await User.findByIdAndUpdate({userId}, {cartItems}, {new: true});
    res.json({success: true, message: "Cart updated successfully"});
   }
   catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Failed to update cart" });
   }
}