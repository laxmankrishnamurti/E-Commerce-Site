import asyncHandler from "../utils/asyncHandler.utils.ts";
import { Request, Response, NextFunction } from "express";
import SELLER from "../models/sellers.model.ts";
import { ISellers } from "../models/sellers.model.ts";
import CustomErrorClass from "../utils/customErrorClass.utils.ts";

const newSellerHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
