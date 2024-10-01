import express, { Request, Response, NextFunction, Router } from "express";
import asyncHandler from "../utils/asyncHandler.utils.ts";
import Joi from "joi";
import CustomErrorClass from "../utils/customErrorClass.utils.ts";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.ts";
import REFRESHTOKEN from "../models/refreshToken.model.ts";
import { generateAccessToken } from "../utils/generateTokens.utils.ts";
import bcrypt from "bcrypt";

const cookiesSchema = Joi.object({
  a_tkn: Joi.string().required(),
  r_tkn: Joi.string().required(),
  c_id: Joi.string().required(),
  d_id: Joi.string().required(),
});

const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = cookiesSchema.validate(req.cookies);

    if (error) {
      return next(new CustomErrorClass(400, `${error.details[0].message}`));
    }

    try {
      const result = jsonwebtoken.verify(
        value.r_tkn,
        config.refresh_token_secret
      );

      if (result) {
        const sessionIdentification = await REFRESHTOKEN.findOne({
          clientId: value.c_id,
          deviceId: value.d_id,
        });

        if (!sessionIdentification) {
          return next(new CustomErrorClass(400, "Invalid client or device id"));
        }

        const isValidRefreshToken = await bcrypt.compare(
          value.r_tkn,
          sessionIdentification.refreshTokenHash
        );

        if (!isValidRefreshToken) {
          return next(new CustomErrorClass(400, "Refresh token mismatch."));
        }

        const newAccessToken = generateAccessToken({
          sellerId: String(sessionIdentification.sellerId),
        });

        res.cookie("a_tkn", newAccessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
          path: "/",
          secure: !config.is_local,
          sameSite: config.is_local ? "lax" : "none",
        });

        return res.status(200).json({
          status: "success",
          message: "A new access token is issued",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.name === "TokenExpiredError" ||
          error.name === "JsonWebTokenError"
        ) {
          const sessionIdentification = await REFRESHTOKEN.findOneAndDelete({
            clientId: value.c_id,
            deviceId: value.d_id,
          });

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

          if (!sessionIdentification) {
            return next(new CustomErrorClass(400, "Session not found"));
          }

          return res.status(400).json({
            status: "fail",
            message: "Session expired due to expired refresh token. re-login",
          });
        }
      }
      next(error);
    }
  }
);

const router: Router = express.Router();

router.route("/").get(handleRefreshToken);

export default router;
