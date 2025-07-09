import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

export const placeOrderByCOD = async (req, res) => {

  try {

    const { userId, items, shippingAddress } = req.body;

    //Validation
    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Missing fields in request" });
    }

    //  Subtotal Calculation
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const price = product.offerPrice || product.price;

      subtotal += price * item.quantity;
    }


    const tax = subtotal * 0.02;

    const totalAmount = subtotal + tax;


    //  Order Create
    const newOrder = await Order.create({
      userId,
      items,
      address: shippingAddress._id, 
      paymentType: "COD",      
      amount: totalAmount,   
      orderStatus: "Pending",
      isPaid: false
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully using COD",
      order: newOrder
    });

  } catch (error) {
    console.error("❌Error placing COD order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



// place order by stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 



export const placeOrderBySTRIPE = async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;
    const { origin } = req.headers;

    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // ✅ Prepare line_items for Stripe
    const line_items = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const price = product.offerPrice || product.price;
      subtotal += price * item.quantity;

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image[0]],
          },
          unit_amount: Math.round(price * 100), // Stripe amount in paise
        },
        quantity: item.quantity,
      });
    }

    const tax = subtotal * 0.02;
    const totalAmount = subtotal + tax;

    // ✅ Create order in DB with isPaid: false
    const newOrder = await Order.create({
      userId,
      items,
      address: shippingAddress._id,
      paymentType: "Online",
      amount: totalAmount,
      orderStatus: "Pending",
      isPaid: false,
    });

    // ✅ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/payment-success?orderId=${newOrder._id}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
      },
    });

    return res.json({ success: true, url: session.url });

  } catch (error) {
    console.error("❌ Stripe order error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};





// get order by userId = /api/order/user
export const GetOrderById = async (req, res) => {
try{
const { userId } = req.body;
const orders = await Order.find({ 
  userId,
  $or:[{paymentType: "COD"},{isPaid:true}]


 }).populate("items.product address").sort({ createdAt: -1 });
 res.json({ success: true, orders });
}catch(error){
res.json({ success: false, message: error.message });
}
}



export const GetAllOrder = async (req, res) => {
try{
const orders = await Order.find({ 
 
  $or:[{paymentType: "COD"},{isPaid:true}]


 }).populate({
  path: "items.product",
  model: "product"
})
.populate({
  path: "address",
  model: "address"
})
.sort({ createdAt: -1 });

 res.json({ success: true, orders });
}catch(error){
res.json({ success: false, message: error.message });
}
}