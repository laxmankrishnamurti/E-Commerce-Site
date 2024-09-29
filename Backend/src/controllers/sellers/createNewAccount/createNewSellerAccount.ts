import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import config from "../../../config/config.ts";
import { generateToken } from "../../../utils/cookieHandler.utils.ts";

//Joi schema to validate the request body
const sellerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string().min(6).max(12).required(),
  phoneNumber: Joi.number().required(),
  storeName: Joi.string().required(),
  panNumber: Joi.string().required(),
  panHolder: Joi.string().required(),
  accountHolder: Joi.string().required(),
  accountNumber: Joi.number().required(),
  ifscCode: Joi.string().required(),
  pickupStreet: Joi.string().required(),
  city: Joi.string().required(),
  pinCode: Joi.number().required(),
  state: Joi.string().required(),
  shippingMethod: Joi.string().valid("SHOPI", "SELF").required(),
  shippingFeePrefrences: Joi.string().valid("CUSTOMER", "SELF").required(),
});

const createNewSellerAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = sellerSchema.validate(req.body);

    //Stoping further execution if a required field is missing in the req.body
    if (error) {
      console.log("Joi validation error : ", error);
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const newSeller = await SELLER.create({
      fullName: value.fullName,
      email: value.email,
      storeName: value.storeName,
      phoneNumber: value.phoneNumber,
      password: value.password,
      panDetails: {
        panNumber: value.panNumber,
        panHolder: value.panHolder,
        panPhoto: req.file?.filename,
      },
      accountDetails: {
        accountHolder: value.accountHolder,
        accountNumber: value.accountNumber,
        ifscCode: value.ifscCode,
      },
      pickupAddress: [
        {
          pickupStreet: value.pickupStreet,
          city: value.city,
          pinCode: value.pinCode,
          state: value.state,
          shippingMethod: value.shippingMethod,
          shippingFeePrefrences: value.shippingFeePrefrences,
        },
      ],
    });

    // Generating access token
    const token: string = generateToken({
      userId: String(newSeller._id),
    });

    // Sending access token
    if (newSeller) {
      res.cookie("a_tkn", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      return res.status(201).json({
        status: "success",
        message: "Account created successfully",
        sellerId: newSeller._id,
      });
    }

    return next(error);
  }
);

export default createNewSellerAccount;
