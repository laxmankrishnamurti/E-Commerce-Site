import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import Joi from "joi";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";
import { Request, Response, NextFunction } from "express";
import config from "../../../config/config.ts";

const logoutSchema = Joi.object({
  a_tkn: Joi.string().required(),
});

const handleLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = logoutSchema.validate(req.cookies);

    if (error) {
      return next(new CustomErrorClass(401, "Token is expired"));
    }

    res.clearCookie("a_tkn", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      secure: !config.is_local,
      sameSite: config.is_local ? "lax" : "none",
    });

    return res.status(200).json({
      status: "success",
      message: "You are logout",
    });
  }
);

export default handleLogout;
