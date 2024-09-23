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

    seller = {
      fullName: changableData?.fullName,
      email: changableData?.email,
    };
    seller?.save();

    return res.status(299).json({
      status: "Pending",
      message: "Updating account details.........",
    });
  }
);

export default updateAccountDetails;
