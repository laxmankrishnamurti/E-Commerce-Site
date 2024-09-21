import { Request, Response, NextFunction } from "express";
import { CustomErrorRequestHandler } from "./customErrorClass.utils.ts";

const developmentError = (error: CustomErrorRequestHandler, res: Response) => {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    errorStack: error
  })
};

const productionError = (error: CustomErrorRequestHandler, res: Response) => {
  console.log(error)
}

export const globalErrorHandler = (
  error: CustomErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    console.log("Node Environment : ", process.env.NODE_ENV);
    developmentError(error, res)
  } else if (process.env.NODE_ENV === "production") {
    console.log("Node Environment : ", process.env.NODE_ENV);
    productionError(error, res)
  }

  res.json({
    error: error,
  });
};
