// models/Address.js
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  country: String,
  street: String,
  Zipcode: Number,
  Phone: String,
  email: String,
});

const Address = mongoose.models.address || mongoose.model("address", AddressSchema); // ✅ 'address'
export default Address;
