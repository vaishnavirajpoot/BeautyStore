import Address from "../models/Address.js";

// addadresss = /api/address/add
export const AddAddress = async (req, res) => {
  try {
    const addressData = req.body; 

    await Address.create(addressData);

    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error.message);
    res.json({ success: false, message: error.message });
  }
};


// getaddress = /api/address/get
export const GetAddress = async (req, res) => {
    try{
        const { userId } = req.body;

        const addresses = await Address.find({userId});
        res.json({success:true,addresses})

    }catch(error){
        console.error("Error getting address:", error.message);
        res.json({ success: false, message: error.message });
    }
}