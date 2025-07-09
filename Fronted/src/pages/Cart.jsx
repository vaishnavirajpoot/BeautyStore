import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../greencart_assets/assets";
import toast from "react-hot-toast";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const Cart = () => {
  const paymentOptions = ["Cash On Delivery", "Online Payment"];
  const {
    products,
    currency,
    cartItems,
    setCartItems,
    user,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
          offerPrice: product.offerPrice || product.price || 0,
        });
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      const items = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items,
          shippingAddress: selectedAddress,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items,
          shippingAddress: selectedAddress,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-6 max-w-6xl w-full px-6 mx-auto bg-[#f8f4ee] min-h-screen text-[#4b3f36]">
      {/* Left Section */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-[#b08968]">
            ({getCartCount()} Items)
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-[#7a6c5d] text-base font-medium pb-3 max-md:hidden">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] max-md:grid-cols-1 gap-y-4 items-center text-sm md:text-base font-medium pt-4 border-b border-[#e0d7ce] pb-4"
          >
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-[#d6cfc4] rounded-lg bg-white"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <p className="text-sm text-[#7a6c5d]">
                  Weight: {product.weight || "N/A"}
                </p>
                <div className="flex items-center mt-1 text-sm">
                  <p className="mr-2">Qty:</p>
                  <div className="relative w-20">
                    <Listbox
                      value={cartItems[product._id]}
                      onChange={(value) =>
                        updateCartItem(product._id, value)
                      }
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded border border-[#d6cfc4] bg-white py-1 pl-3 pr-8 text-left text-[#4b3f36] focus:outline-none focus:bg-[#fce7f3] focus:text-[#5e3b3b]">
                          {cartItems[product._id]}
                          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                            <ChevronUpDownIcon className="h-4 w-4 text-[#4b3f36]" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 no-scrollbar  ring-black/10 focus:outline-none sm:text-sm">
                          {Array(
                            cartItems[product._id] > 9
                              ? cartItems[product._id]
                              : 9
                          )
                            .fill("")
                            .map((_, i) => (
                              <Listbox.Option
                                key={i}
                                value={i + 1}
                                className={({ active }) =>
                                  `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-pink-100 text-[#5e3b3b]"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {i + 1}
                                  </span>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center max-md:text-left">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto max-md:ml-0"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group flex items-center mt-8 gap-2 text-[#b08968] font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="group-hover:-translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* Right Section: Order Summary */}
      <div className="max-w-[360px] w-full bg-[#fcf9f5] shadow-md border border-[#d6cfc4] rounded-xl h-fit p-6 max-md:mt-16 space-y-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <hr className="border-[#d6cfc4]" />

        {/* Address Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase">Delivery Address</p>
          <div className="flex justify-between items-start">
            <p className="text-sm max-w-[80%]">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => {
                if (!user?._id) {
                  navigate("/cart", { state: { from: "/cart" } });
                } else {
                  navigate("/add-address");
                }
              }}
              className="text-[#5e3b3b] hover:underline text-sm"
            >
              Change
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase text-[#4b3f36]">
            Payment Method
          </p>
          <Listbox value={paymentOption} onChange={setPaymentOption}>
            <div className="relative">
              <Listbox.Button className="w-full border border-[#d6cfc4] bg-white text-[#4b3f36] px-4 py-2 rounded-md flex justify-between items-center focus:outline-none">
                {paymentOption}
                <ChevronUpDownIcon className="w-5 h-5 text-[#4b3f36]" />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white border border-[#d6cfc4] rounded-md shadow-lg z-10">
                {paymentOptions.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active }) =>
                      `px-4 py-2 cursor-pointer ${
                        active ? "bg-[#5e3b3b] text-white" : "text-[#4b3f36]"
                      }`
                    }
                  >
                    {option}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <hr className="border-[#d6cfc4]" />

        {/* Price Details */}
        <div className="text-[#4b3f36] text-sm space-y-2 pt-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-[#5e3b3b]">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-base font-semibold mt-3">
            <span>Total Amount</span>
            <span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 bg-[#b08968] hover:bg-[#a0744d] text-white font-medium rounded-md transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
