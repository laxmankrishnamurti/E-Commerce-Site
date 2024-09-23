import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import Joi from "joi";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import { verifyToken } from "../../../utils/cookieHandler.utils.ts";

const parameterSchema = Joi.object({
  sellerId: Joi.string().required(),
});

interface IParams {
  sellerId: string;
}

const getAccountDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.a_tkn;

    if (!cookie) {
      return next(new CustomErrorClass(403, "Token is expired, login first"));
    }

    const tokenPayload = verifyToken(cookie);
    const { error, value } = parameterSchema.validate(req.params);

    if (error) {
      return next(new CustomErrorClass(400, error.message));
    }

    // Confirming both payload are equal or not
    if (tokenPayload.userId !== value.sellerId) {
      return next(new CustomErrorClass(401, "Invalid access token"));
    }

    // Casting data
    const data: IParams = value;

    // Fetching the seller data
    const seller = await SELLER.findOne({ _id: data.sellerId });

    if (!seller) {
      return next(new CustomErrorClass(404, "You don't have an account yet"));
    }

    res.status(200).json({
      status: "success",
      data: seller,
    });
  }
);

export default getAccountDetails;
