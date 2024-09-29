import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import { verifyToken } from "../../../utils/cookieHandler.utils.ts";
import config from "../../../config/config.ts";

const paramsSchema = Joi.object({
  sellerId: Joi.string().required(),
});

const deleteAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.a_tkn;

    if (!cookie) {
      return next(new CustomErrorClass(403, "Token is expired, login first"));
    }

    const tokenPayload = verifyToken(cookie);

    const { error, value } = paramsSchema.validate(req.params);

    if (error) {
      return next(new CustomErrorClass(400, error.message));
    }

    // Confirming both payload are equal or not
    if (tokenPayload.userId !== value.sellerId) {
      return next(new CustomErrorClass(401, "Invalid access token"));
    }

    const sellerId: string = value.sellerId;
    const deletedSeller = await SELLER.findOneAndDelete({ _id: sellerId });

    if (!deletedSeller) {
      return next(new CustomErrorClass(401, "User dosen't exist"));
    }

    // Clear the cookie
    res.clearCookie("a_tkn", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      secure: !config.is_local,
      sameSite: config.is_local ? "lax" : "none",
    });

    return res.status(200).json({
      status: "success",
      message: "Account deleted successfully",
    });
  }
);

export default deleteAccount;
