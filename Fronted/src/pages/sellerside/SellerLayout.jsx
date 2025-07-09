import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/Appcontext";
import { assets } from "../../greencart_assets/assets";
import React from "react";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        setIsSeller(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex h-16  items-center justify-between px-4 md:px-8 border-[#5e3b3b] py-3 bg-rose-50 shadow-sm">
        <Link to="/">
          <img src={assets.beautyLogo} alt="logo" className="cursor-pointer w-24 md:w-28" />
        </Link>
        <div className="flex items-center gap-7 text-[#5e3b3b] text-sm">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-rose-300 text-[#5e3b3b] rounded-full px-4 py-1 hover:bg-rose-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Outlet */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-52 w-16 border-r h-screen no-scrollbar border-rose-200 bg-rose-50 text-sm pt-4 flex flex-col overflow-y-auto">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-3 gap-2 transition-all duration-200 rounded-l-full mx-1 my-1 
                ${isActive
                  ? "bg-rose-200 text-[#5e3b3b] font-medium shadow-inner"
                  : "hover:bg-rose-100 text-[#5e3b3b]"}`
              }
            >
              <img src={item.icon} alt="" className="w-5 h-5" />
              <span className="md:inline hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Outlet Content */}
        <div className="flex-1 max-h-screen  no-scrollbar overflow-hidden bg-[#fdf6f3]">
          <div className="h-[calc(100vh-64px)] no-scrollbar overflow-y-auto py-4 px-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
