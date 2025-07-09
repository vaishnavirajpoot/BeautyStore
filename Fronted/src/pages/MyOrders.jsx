import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";

const MyOrders = () => {
  const { user, axios, currency } = useAppContext();
  const [myOrders, setMyOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user", {
        userId: user._id,
      });

      if (data.success) {
        setMyOrders(data.orders || []);
      }
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="pb-14 px-4 md:px-10 lg:px-20 bg-[#fff4f6] min-h-screen">
      {/* Heading */}
      <div className="pb-6 pt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#5a3b3b] uppercase">My Orders</h1>
        <div className="w-20 h-1 mt-2 bg-[#5a3b3b] mx-auto rounded-full" />
      </div>

      {/* Orders List */}
      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">You haven't placed any orders yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="bg-[#fff4f6] rounded-xl shadow-md p-4 mb-10 w-full"
          >
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-900 mb-4 border-b pb-4">
              <div><span className="font-semibold">Order ID:</span> {order._id}</div>
              <div><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</div>
              <div><span className="font-semibold">Total:</span> {currency}{order.amount || order.totalAmount || 0}</div>
            </div>

            {/* Items */}
            {order.items?.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-start py-4 gap-4">
                  {/* Left: Product Info */}
                  <div className="flex items-start gap-4 w-full md:w-[55%]">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col text-left text-sm text-gray-700">
                      <h2 className="text-lg font-semibold text-[#5a3b3b]">{item.product.name}</h2>
                      <p className="text-gray-500">Category: {item.product.category}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                      <p>Payment: {order.paymentType}</p>
                      <p>Status: {order.status || "Pending"}</p>
                    </div>
                  </div>

                  {/* Right: Amount & Address */}
                  <div className="flex flex-col gap-2 w-full md:w-[40%] text-right md:text-left">
                    <p className="text-[#5a3b3b] font-semibold text-base">
                      Amount: {currency}
                      {item.product?.offerPrice
                        ? item.product.offerPrice * item.quantity
                        : item.product?.price * item.quantity || 0}
                    </p>
                    {order.address && (
                      <div className="text-sm text-gray-600 leading-snug mt-2">
                        <p className="font-semibold text-[#5a3b3b]">Delivery Address:</p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city}, {order.address.state} - {order.address.zip}</p>
                        <p>{order.address.country}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                {itemIndex < order.items.length - 1 && (
                  <hr className="border-t border-gray-200 my-3" />
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
