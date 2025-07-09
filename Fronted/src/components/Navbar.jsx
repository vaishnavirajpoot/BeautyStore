import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../greencart_assets/assets';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user,axios, setUser, showUserLogin, setShowUserLogin, navigate ,setSearchQuery,searchQuery,getCartCount} = useAppContext();

  const logout = async () => {
    try{
      const {data} =  await axios.post('api/user/logout');
      if(data.success){
        toast.success(data.message);
        setUser(null);
        navigate('/')
      }else{
        toast.success(error.message)
      }
    }catch(error){
              toast.success(error.message)

    }
  };

  useEffect(()=>{
    if(searchQuery.length > 0){
      navigate("/products")
    }
  },[searchQuery])

  return (
    <nav className=" h-16 flex items-center justify-between  px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300  bg-[#fceeea] relative transition-all z-30">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className=" h-24 w-24" src={assets.beautyLogo} alt="dummyLogoColored" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center font-semibold text-[#5e3b3b] gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
          onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="h-4 w-4" />
        </div>

        <div className="relative cursor-pointer">
          <img onClick={() => navigate("/cart")} src={assets.nav_cart_icon} alt="cart" className="opacity-80 w-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#5e3b3b] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-[#5e3b3b] transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="profile" className="w-10" />
            <ul className="hidden group-hover:flex absolute top-10 right-0 bg-white shadow-md rounded-md flex-col items-start p-2 text-sm">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1 text-sm pl-3 cursor-pointer whitespace-nowrap"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3  cursor-pointer whitespace-nowrap"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

    <div className='flex item-center gap-6 sm:hidden'>
 <div className="relative cursor-pointer">
          <img onClick={() => navigate("/cart")} src={assets.nav_cart_icon} alt="cart" className="opacity-80 w-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#5e3b3b] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>


      <button onClick={() => setOpen(!open)} aria-label="Menu" className="">
        <img src={assets.menu_icon} alt="menu" />
      </button>


    </div>



      {/* Mobile Menu (Fixed and on top) */}
      {open && (
        <div className="fixed top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-40">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Product</NavLink>

          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)}>All Orders</NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-[#5e3b3b] transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-[#5e3b3b]  transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
