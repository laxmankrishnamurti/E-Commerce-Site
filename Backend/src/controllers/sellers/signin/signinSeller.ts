import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import { passwordDecryptionHandler } from "../../../utils/passwordHandler.utils.ts";
import config from "../../../config/config.ts";
import generateTokens from "../../../utils/generateTokens.utils.ts";
import { v4 as uuidv4 } from "uuid";


const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

interface ISignin {
  email: string;
  password: string;
}

const signinSeller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = signinSchema.validate(req.body);

    if (error) {
      return next(new CustomErrorClass(400, error.message));
    }

    const data: ISignin = value;

    // Checking does user exist or not.
    const user = await SELLER.findOne({ email: data.email });

    if (!user) {
      return next(new CustomErrorClass(404, "You don't have an account yet"));
    }

    // Checking password
    const passwordStatus: boolean = await passwordDecryptionHandler(
      data.password,
      user.password
    );

    if (!passwordStatus) {
      return next(new CustomErrorClass(401, "Password is incorrect"));
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

    // Generating a sessionId or clientId
    const clientId = uuidv4();

    if (user) {
      // Creating a session for the new user and sending appropriate tokens
      const tokens = await generateTokens(
        String(user._id),
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

      return res.status(200).json({
        status: "success",
        message: "Login successful",
        sellerId: user._id,
      });
    }
  }
);

export default signinSeller;
