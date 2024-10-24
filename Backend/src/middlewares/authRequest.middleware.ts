import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler.utils.ts";
import Joi from "joi";
import CustomErrorClass from "../utils/customErrorClass.utils.ts";
import jsonwebtoken from "jsonwebtoken";
import { CustomJwtPayload } from "../express";
import config from "../config/config.ts";
import REFRESHTOKEN from "../models/refreshToken.model.ts";

const cookiesSchema = Joi.object({
  a_tkn: Joi.string().required(),
  r_tkn: Joi.string().required(),
  c_id: Joi.string().required(),
  d_id: Joi.string().required(),
});

const authRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = cookiesSchema.validate(req.cookies);

    if (error) {
      return next(new CustomErrorClass(400, "You are logged out"));
    }

    const { a_tkn, d_id } = value;

    let result: string | CustomJwtPayload;

    try {
      result = (await jsonwebtoken.verify(
        a_tkn,
        config.access_token_secret
      )) as string | CustomJwtPayload;
    } catch (err) {
      return next(new CustomErrorClass(401, "Access token is expired"));
    }

    if (typeof result === "string") {
      return next(new CustomErrorClass(401, "Access token is invalid"));
    }

    const sessionIdentification = await REFRESHTOKEN.findOne({
      sellerId: result.sellerId,
      clientId: value.c_id,
      deviceId: d_id,
    });

    if (!sessionIdentification) {
      return next(new CustomErrorClass(401, "Session expired"));
    }

    req.user = result;
    next();
  }
);

export default authRequest;
