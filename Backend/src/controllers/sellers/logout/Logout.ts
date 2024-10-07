import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import { Request, Response, NextFunction } from "express";
import config from "../../../config/config.ts";
import REFRESHTOKEN from "../../../models/refreshToken.model.ts";

const handleLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { c_id, d_id } = req.cookies;

    //Destroying existing session
    const sessionIdentification = await REFRESHTOKEN.findOneAndDelete({
      sellerId: req.user?.sellerId,
      clientId: c_id,
      deviceId: d_id,
    });

    if (sessionIdentification) {
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
    }

    return res.status(200).json({
      status: "success",
      message: "You are logout",
    });
  }
);

export default handleLogout;
