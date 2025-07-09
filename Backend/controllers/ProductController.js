
import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js'; // make sure path is correct

// add product = /api/product/add
export const AddProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      image: imagesUrl,
    });

    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};





// Get all product = /api/product/list
export const GetProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    console.log("Error in GetProduct:", error.message);
    res.json({ success: false, message: error.message });
  }
};





// Get single product = /api/product/id
export const GetSingleProduct = async (req, res) => {
try{
    const { id } = req.body;
const product = await Product.findById(id);
res.json({ success: true, product });
}catch(error){
    console.log("Error in GetProduct:", error.message);
    res.json({ success: false, message: error.message });
}
}


// Change Product inStock = /api/product/stock

export const ChangeProductStock = async (req, res) => {

try{
const { id, inStock } = req.body;
await Product.findByIdAndUpdate(id, { inStock }, { new: true });
res.json({ success: true, message: "Product stock updated successfully" });
}catch(error){
   console.log("Error in GetProduct:", error.message);
    res.json({ success: false, message: error.message });
}

}