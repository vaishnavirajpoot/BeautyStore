import React from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/Appcontext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import AddAdderess from './pages/AddAdderess.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/sellerside/SellerLayout.jsx'
import ProductList from './pages/sellerside/ProductList.jsx'
import AddProduct from './pages/sellerside/AddProduct.jsx'
import Orders from './pages/sellerside/Orders.jsx'
const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
const {showUserLogin,isSeller} = useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-[#fceeea]'>
      {isSellerPath ? null :  <Navbar />}
     {showUserLogin ? <Login/> : null}
      <Toaster/>
     

      <div className={`${isSellerPath ? "" : "px-6 md:px-5 lg:px-5 xl:px-32 py-4"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
           <Route path="/products/:category" element={<ProductCategory/>} />
        <Route path="/products/:category/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/add-address" element={<AddAdderess/>} />
            <Route path="/my-orders" element={<MyOrders/>} />
            <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
              <Route index element={isSeller ? <AddProduct/> : null}/>
              <Route path='product-list' element={<ProductList/>}/>
              <Route path='orders' element={<Orders/>}/>
              {/* <Route path="/seller/dashboard" element={isSeller ? <SellerDashboard /> : <Navigate to="/seller" />} /> */}


            </Route>

        </Routes>
      </div>

     {!isSellerPath &&  <Footer/>}
    </div>
  )
}

export default App;
