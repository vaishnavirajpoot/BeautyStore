import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/Appcontext';

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      className="w-full px-4 py-2 border border-[#e2cfcf] rounded-md outline-none bg-white text-[#4b3f36] placeholder:text-sm placeholder:text-[#b89b8e] focus:ring-2 focus:ring-[#d6a3a3] transition"
    />
  );
};

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    Zipcode: '',
    country: '',
    Phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', {
        ...address,
        userId: user._id,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#fff6f6] px-4 py-10 text-[#4b3f36]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Add Shipping Address</h2>
        <p className="text-sm text-[#b89b8e] text-center mb-6">Please fill in the details carefully to ensure smooth delivery.</p>

        <form onSubmit={onSubmitHandler} className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-[#f0e2e2]">
          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            name="email"
            type="email"
            placeholder="Email"
          />

          <InputField
            handleChange={handleChange}
            address={address}
            name="street"
            type="text"
            placeholder="Street Address"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="city"
              type="text"
              placeholder="City"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="state"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="Zipcode"
              type="text"
              placeholder="Zip Code"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="country"
              type="text"
              placeholder="Country"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            name="Phone"
            type="text"
            placeholder="Phone Number"
          />

          <button
            type="submit"
            className="w-full bg-[#5e3b3b] hover:bg-[#c98f8f] text-white font-semibold py-2 rounded-md transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
