import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import { passwordDecryptionHandler } from "../../../utils/passwordHandler.utils.ts";
import { generateToken } from "../../../utils/cookieHandler.utils.ts";
import config from "../../../config/config.ts";

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

    // Generating access token
    const token: string = generateToken({ userId: String(user._id) });

    // Sending access token
    // secure: process.env.NODE_ENV === 'production',
    res.cookie("a_tkn", token, {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000, 
      path: '/',
      // secure: !config.is_local,
      secure: process.env.NODE_ENV === 'production' && !config.is_local,
      // sameSite: config.is_local ? "lax" : "none"
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      sellerId: user._id,
    });
  }
);

export default signinSeller;
