// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number }, 
  image: { type: Array, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", ProductSchema); // ✅ 'product'
export default Product;
