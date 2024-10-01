import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import Joi from "joi";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import SELLER from "../../../models/sellers.model.ts";

const parameterSchema = Joi.object({
  sellerId: Joi.string().required(),
});

interface IParams {
  sellerId: string;
}

const getAccountDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.a_tkn;

    // If cookie is null or undefined return back
    if (!cookie) {
      return next(new CustomErrorClass(403, "Token is expired, login first"));
    }

    const { error, value } = parameterSchema.validate(req.params);

    if (error) {
      return next(new CustomErrorClass(400, error.message));
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
