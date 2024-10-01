import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import { v4 as uuidv4 } from "uuid";
import generateTokens from "../../../utils/generateTokens.utils.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import config from "../../../config/config.ts";

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
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    // Getting deviceId from request rawHeader
    let deviceId: string | null = null;
    req.rawHeaders.map((value, index) => {
      if (value === "deviceId") {
        deviceId = req.rawHeaders[index + 1];
      }
    });

    if (!deviceId) {
      return next(new CustomErrorClass(400, "deviceId is required"));
    }

    console.log("deviceId : ", deviceId);
    // Generating a sessionId or clientId
    const clientId = uuidv4();
    console.log("clientId : ", clientId);

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

    // Sending access token
    if (newSeller) {
      // generateTokens also make a new entry of the session into the database (refreshtokens collections)
      const tokens = await generateTokens(
        String(newSeller._id),
        String(clientId),
        String(deviceId)
      );

      res.cookie("a_tkn", tokens.accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.cookie("r_tkn", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.cookie("c_id", clientId, {
        httpOnly: true,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.cookie("d_id", deviceId, {
        httpOnly: true,
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
