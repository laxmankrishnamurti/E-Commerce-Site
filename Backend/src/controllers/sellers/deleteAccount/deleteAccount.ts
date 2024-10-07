import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import config from "../../../config/config.ts";

const deleteAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellerId = req?.user?.sellerId;
    const deletedSeller = await SELLER.findOneAndDelete({ _id: sellerId });

    if (!deletedSeller) {
      return next(new CustomErrorClass(401, "User dosen't exist"));
    }

    // Clear the cookie
    if (deletedSeller) {
      res.clearCookie("a_tkn", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.clearCookie("r_tkn", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.clearCookie("c_id", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        secure: !config.is_local,
        sameSite: config.is_local ? "lax" : "none",
      });

      res.clearCookie("d_id", {
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
  }
);

export default deleteAccount;
