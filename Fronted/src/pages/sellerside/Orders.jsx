import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/Appcontext";
import { assets } from "../../greencart_assets/assets";
import toast from "react-hot-toast";


const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
            No orders right now
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              {/* Order Items */}
              <div className="flex flex-col gap-3">
                {Array.isArray(order.items) &&
                  order.items
                    .filter((item) => item.product) // ✅ Ignore items without product
                    .map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img
                          className="w-12 h-12 object-cover rounded-md"
                          src={item.product.image?.[0] || assets.box_icon}
                          alt={item.product.name}
                        />
                        <div>
                          <p className="font-medium">
                            {item.product.name}
                            <span
                              className={`text-[#5e3b3b] ${
                                item.quantity < 2 && "hidden"
                              }`}
                            >
                              {" "}
                              x {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Address */}
              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order?.address?.firstName} {order?.address?.lastName}
                </p>
                <p>
                  {order?.address?.street}, {order?.address?.city},{" "}
                  {order?.address?.state}, {order?.address?.zipcode},{" "}
                  {order?.address?.country}
                </p>
                <p>{order?.address?.phone}</p>
              </div>

              {/* Amount */}
              <p className="font-medium text-lg my-auto">
                {currency}
                {order?.amount ?? 0}
              </p>

              {/* Payment Info */}
              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
