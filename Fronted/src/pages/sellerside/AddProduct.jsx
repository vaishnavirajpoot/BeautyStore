import React, { useState } from "react";
import { assets, categories } from "../../greencart_assets/assets";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";
import Select from "react-select"; 

const AddProduct = () => {
  const { axios, fetchProducts } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null); 
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const ProductData = {
        name,
        description: description.split("\n"),
        category: category?.value || "",
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(ProductData));

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post('/api/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Product added successfully!");
        fetchProducts();
        setFiles([]);
        setName("");
        setDescription("");
        setCategory(null);
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const categoryOptions = categories.map((item) => ({
    value: item.path,
    label: item.text,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 6,
      border: '1px solid #d1d5db',
      padding: '2px',
      boxShadow: 'none',
      fontSize: '0.875rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#fce7f3' : 'white',
      color: state.isFocused ? '#be185d' : 'black',
      cursor: 'pointer',
      fontSize: '0.875rem',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      '&::-webkit-scrollbar': { display: 'none' },
    }),
  };

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto text-sm">
      <form
        onSubmit={onSubmitHandler}
        className=" space-y-2 max-w-lg"
      >
        {/* Product Image Upload */}
        <div>
          <p className="font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={3}
            className="outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Product Category */}
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="category">
            Category
          </label>
          <Select
            id="category"
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            styles={customStyles}
            placeholder="Select Category"
          />
        </div>

        {/* Price and Offer Price */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="px-8 py-2 mt-2 bg-[#5e3b3b] text-white font-medium rounded w-fit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
