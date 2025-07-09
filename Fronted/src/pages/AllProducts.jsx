import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col bg-[#fceeea] min-h-screen px-4'>

  <div className='flex flex-col items-start w-full'>
    <p className='text-2xl font-medium uppercase'>All Products</p>
    <div className='w-16 h-0.5 bg-[#5e3b3b] rounded-full'></div>
  </div>

<div className='grid grid-cols-1 pl-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 mt-6'>
    {filteredProducts.filter(product => product.inStock).map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </div>
</div>

  );
};

export default AllProducts;
