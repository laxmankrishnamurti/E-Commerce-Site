import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import Joi from "joi";
import SELLER from "../../../models/sellers.model.ts";

const parameterSchema = Joi.object({
  sellerId: Joi.string().required(),
});

interface IParams {
  sellerId: string;
}

const updateAccountDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = parameterSchema.validate(req.params);

    if (error) {
      return next(new CustomErrorClass(400, error.message));
    }

    // Casting data
    const data: IParams = value;

    // Fetching the seller data
    let seller = await SELLER.findOne({ _id: data.sellerId });

    if (!seller) {
      return next(new CustomErrorClass(404, "You don't have an account yet"));
    }

    const changableData: Record<string, string> = req.body;
    console.log("changable data : ", changableData)

    // Updating values 
    seller.fullName = changableData?.fullName || seller.fullName;
    seller.email = changableData?.email || seller.email;
    seller.password = changableData?.password || seller.password;
    seller.phoneNumber = Number(changableData?.phoneNumber) || seller.phoneNumber;
    seller.storeName = changableData?.storeName || seller.storeName;

    seller.panDetails = {
      panHolder: changableData?.panHolder || seller.panDetails.panHolder,
      panNumber: changableData?.panNumber || seller.panDetails.panNumber,
      panPhoto: changableData?.panPhoto || seller.panDetails.panPhoto
    }

    seller.accountDetails = {
      accountHolder: changableData?.accountHolder || seller.accountDetails.accountHolder,
      accountNumber: changableData?.accountNumber ? Number(changableData?.accountNumber) : seller.accountDetails.accountNumber,
      ifscCode: changableData?.ifscCode || seller.accountDetails.ifscCode
    }

    if (Number(changableData?.pinCode) !== Number(seller.pickupAddress[0].pinCode)) {
      // Pin code has changed, push a new address object
      seller.pickupAddress.push({
        pickupStreet: changableData?.pickupStreet || seller.pickupAddress[0]?.pickupStreet,
        city: changableData?.city || seller.pickupAddress[0]?.city,
        pinCode: Number(changableData?.pinCode), // Use the new pin code
        state: changableData?.state || seller.pickupAddress[0]?.state,
        shippingMethod: (changableData?.shippingMethod as "SHOPI" | "SELF") || seller.pickupAddress[0]?.shippingMethod || "SHOPI",
        shippingFeePrefrences: (changableData?.shippingFeePrefrences as "SELF" | "CUSTOMER") || seller.pickupAddress[0]?.shippingFeePrefrences || "SELF"
      });
    } else {
      // Pin code hasn't changed, just update the existing address
      seller.pickupAddress[0] = {
        pickupStreet: changableData?.pickupStreet || seller.pickupAddress[0]?.pickupStreet,
        city: changableData?.city || seller.pickupAddress[0]?.city,
        pinCode: Number(changableData?.pinCode) || seller.pickupAddress[0]?.pinCode,
        state: changableData?.state || seller.pickupAddress[0]?.state,
        shippingMethod: (changableData?.shippingMethod as "SHOPI" | "SELF") || seller.pickupAddress[0]?.shippingMethod || "SHOPI",
        shippingFeePrefrences: (changableData?.shippingFeePrefrences as "SELF" | "CUSTOMER") || seller.pickupAddress[0]?.shippingFeePrefrences || "SELF"
      };
    }
    
    try {
      await seller.save()
    } catch (error) {
      return next(new CustomErrorClass(500, "Updation failed, please try again."))
    }

    return res.status(200).json({
      status: "success",
      message: "Updation successful"
    });
  }
);

export default updateAccountDetails;
