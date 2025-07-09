import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product", // ✅ Must match Product model name
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "address", // ✅ Must match Address model name
  },
  status: {
    type: String,
    default: "order placed",
  },
  paymentType: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model("order", OrderSchema); // ✅ Singular and lowercase
export default Order;
