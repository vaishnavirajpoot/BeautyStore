import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
      mongoose.connection.on("connected", () => {
console.log("MongoDB connected successfully");
      })
      await mongoose.connect(`${process.env.
MONGODB_URL}/greencart`)
    } catch (error) {
       console.error("MongoDB connection failed:", error);
    }
}

export default ConnectDB;