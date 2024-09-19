import { Request, Response, NextFunction } from "express";
import CustomErrorRequestHandler from "./customErrorClass.utils";

export const globalErrorHandler = (
  error: CustomErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
