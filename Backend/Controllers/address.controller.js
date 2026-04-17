// controllers/address.controller.js

import Address from "../Models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      fullName,
      mobile,
      alternateMobile,
      pincode,
      state,
      city,
      area,
      landmark,
      houseNo,
      addressType,
      isDefault,
    } = req.body;
    

    // Validation
    if (
      !fullName ||
      !mobile ||
      !pincode ||
      !state ||
      !city ||
      !area ||
      !houseNo
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }
    

    // If new address default hai to old default remove
    if (isDefault) {
      await Address.updateMany(
        {
          user: userId,
          isDefault: true,
        },
        {
          $set: { isDefault: false },
        }
      );
    }

    const address = await Address.create({
      user: userId,
      fullName,
      mobile,
      alternateMobile,
      pincode,
      state,
      city,
      area,
      landmark,
      houseNo,
      addressType:
        addressType || "home",
      isDefault:
        isDefault || false,
    });

    
    console.log("1")
    return res.status(201).json({
      success: true,
      message:
        "Address added successfully",
      address,
    });
  } catch (error) {
    console.log(
      "Add Address Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while adding address",
    });
  }
};


export const getUserAddresses = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const addresses =
      await Address.find({
        user: userId,
        status: "active",
      }).sort({
        isDefault: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      total: addresses.length,
      addresses,
    });
  } catch (error) {
    console.log(
      "Get User Addresses Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching addresses",
    });
  }
};