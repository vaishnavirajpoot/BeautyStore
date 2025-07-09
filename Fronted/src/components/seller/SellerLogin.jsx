import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        "/api/seller/login",
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return !isSeller && (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-sm border border-rose-200"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-rose-300 text-white text-xl font-bold rounded-full flex items-center justify-center shadow-md">
            S
          </div>
          <h2 className="text-xl mt-3 font-semibold text-rose-800">Welcome Seller 👋</h2>
          <p className="text-sm text-rose-500">Please login to your account</p>
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-rose-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-rose-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm placeholder:text-rose-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-rose-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="border border-rose-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm placeholder:text-rose-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-rose-400 hover:bg-rose-500 text-white w-full py-2.5 rounded-lg font-semibold shadow-md transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
