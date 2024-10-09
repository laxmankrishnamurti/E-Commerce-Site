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

    // Updating values
    seller.fullName = changableData?.fullName || seller.fullName;
    seller.email = changableData?.email || seller.email;
    seller.password = changableData?.password || seller.password;
    seller.phoneNumber =
      Number(changableData?.phoneNumber) || seller.phoneNumber;
    seller.storeName = changableData?.storeName || seller.storeName;

    seller.accountDetails = {
      accountHolder:
        changableData?.accountHolder || seller.accountDetails.accountHolder,
      accountNumber: changableData?.accountNumber
        ? Number(changableData?.accountNumber)
        : seller.accountDetails.accountNumber,
      ifscCode: changableData?.ifscCode || seller.accountDetails.ifscCode,
    };

    let isAddrExist = false;
    // Getting all Pin Code
    const allPinCode = seller.pickupAddress.map((addr) => addr.pinCode);

    if (changableData.pinCode) {
      for (let i = 0; i < allPinCode.length; i++) {
        if (Number(changableData.pinCode) === Number(allPinCode[i])) {
          isAddrExist = true;

          seller.pickupAddress[i] = {
            pickupStreet:
              changableData.pickupStreet ||
              seller.pickupAddress[i].pickupStreet,
            city: changableData.city || seller.pickupAddress[i].city,
            pinCode:
              Number(changableData.pinCode) || seller.pickupAddress[i].pinCode,
            state: changableData.state || seller.pickupAddress[i].state,
            shippingMethod:
              (changableData?.shippingMethod as "SHOPI" | "SELF") ||
              seller.pickupAddress[i].shippingMethod,
            shippingFeePrefrences:
              (changableData?.shippingFeePrefrences as "SELF" | "CUSTOMER") ||
              seller.pickupAddress[i].shippingFeePrefrences,
          };
        }
      }
    }

    if (!isAddrExist) {
      // Pin code has changed, push a new address object
      seller.pickupAddress.push({
        pickupStreet: changableData.pickupStreet,
        city: changableData.city,
        pinCode: Number(changableData.pinCode),
        state: changableData.state,
        shippingMethod: changableData?.shippingMethod as "SHOPI" | "SELF",
        shippingFeePrefrences: changableData?.shippingFeePrefrences as
          | "SELF"
          | "CUSTOMER",
      });
    }

    try {
      await seller.save();
    } catch (error) {
      console.error("error during saving document : ", error);
      if (error instanceof Error) {
        return next(new CustomErrorClass(500, `${error.message}`));
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Updation successful",
    });
  }
);

export default updateAccountDetails;
