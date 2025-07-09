import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name, email, password
      });

      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log("Register Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center w-screen h-screen bg-black/30"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 items-start px-6 py-8 w-80 sm:w-[352px] rounded-2xl shadow-2xl border border-white/20 bg-white/20 backdrop-blur-lg"
      >
        <p className="text-2xl font-semibold text-[#5e3b3b] m-auto">
          {state === "login" ? "Welcome Back 👋" : "Create Account"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="text-[#5e3b3b]">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-[#5e3b3b]/50"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-[#5e3b3b]">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-[#5e3b3b]/50"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-[#5e3b3b]">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-[#5e3b3b]/50"
            type="password"
            required
          />
        </div>

        <p className="text-sm text-[#5e3b3b]">
          {state === "register" ? "Already have an account?" : "Create an account?"}{" "}
          <span
            onClick={() => setState(state === "login" ? "register" : "login")}
            className="text-white underline cursor-pointer ml-1"
          >
            Click here
          </span>
        </p>

        <button className="bg-[#5e3b3b] hover:bg-[#8b5e5e] transition-all text-white w-full py-2 rounded-md cursor-pointer shadow-md">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
