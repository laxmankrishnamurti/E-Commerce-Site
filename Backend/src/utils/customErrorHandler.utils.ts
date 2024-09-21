import { Request, Response, NextFunction } from "express";
import { CustomErrorRequestHandler } from "./customErrorClass.utils.ts";

const developmentError = (erro: CustomErrorRequestHandler, res: Response) => {};

export const globalErrorHandler = (
  error: CustomErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    console.log("Node Environment : ", process.env.NODE_ENV);
  } else if (process.env.NODE_ENV === "production") {
    console.log("Node Environment : ", process.env.NODE_ENV);
  }

  res.json({
    error: error,
  });
};
