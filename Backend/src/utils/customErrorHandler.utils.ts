import { Request, Response, NextFunction } from "express";
import { CustomErrorRequestHandler } from "./customErrorClass.utils.ts";

export const globalErrorHandler = (
  error: CustomErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error : ", error);
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "fail";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
