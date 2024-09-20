import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../utils/asyncHandler.utils.ts";
import SELLER from "../models/sellers.model.ts";
import { ISellers } from "../models/sellers.model.ts";
import CustomErrorClass from "../utils/customErrorClass.utils.ts";

//Joi schema to validate the request body
const sellerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
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
    const { error } = sellerSchema.validate(req.body);

    if (error) {
      return next(new CustomErrorClass(400, error.details[0].message));
    }

    const data: ISellers = req.body;
    console.log("data :: ", data);

    const newSeller = await SELLER.create({
      ...data,
      pickupAddress: [data.pickupAddress],
    });

    if (newSeller) {
      return res.status(201).json({
        status: "success",
        data: newSeller,
      });
    }

    let err = new CustomErrorClass(500, "Internal server error");
    return next(err);
  }
);

export { newSellerHandler };
