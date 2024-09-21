import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../utils/asyncHandler.utils.ts";
import SELLER from "../models/sellers.model.ts";
import { ISellers } from "../models/sellers.model.ts";
import CustomErrorClass from "../utils/customErrorClass.utils.ts";

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
  panDetails: Joi.object({
    panNumber: Joi.string().required(),
    panHolder: Joi.string().required(),
    panPhoto: Joi.string().required(),
  }),
  accountDetails: Joi.object({
    accountHolder: Joi.string().required(),
    accountNumber: Joi.number().required(),
    ifscCode: Joi.string().required(),
  }),
  pickupAddress: Joi.object({
    pickupStreet: Joi.string().required(),
    city: Joi.string().required(),
    pinCode: Joi.number().required(),
    state: Joi.string().required(),
    shippingMethod: Joi.string().valid("SHOPI", "SELF").required(),
    shippingFeePrefrences: Joi.string().valid("CUSTOMER", "SELF").required(),
  }),
});

const newSellerHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = sellerSchema.validate(req.body);

    //Stoping further execution if a required field is missing in the req.body
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    //Casting the vlaue to TypeScript interface
    const data: ISellers = value as ISellers;

    const newSeller = await SELLER.create({
      ...data,
      pickupAddress: [data.pickupAddress],
    });

    if (newSeller) {
      return res.status(201).json({
        status: "success",
        message: "The account has been created successfully",
      });
    }

    return next(error);
  }
);

export { newSellerHandler };
