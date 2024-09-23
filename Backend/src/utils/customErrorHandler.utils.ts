import { Request, Response, NextFunction } from "express";
import { CustomErrorRequestHandler } from "./customErrorClass.utils.ts";

const developmentError = (error: CustomErrorRequestHandler, res: Response) => {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    errorStack: error.stack,
    error: error,
  });
};

const productionError = (error: CustomErrorRequestHandler, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }

  if (error.code === 11000) {
    res.status(409).json({
      status: "fail",
      message:
        "The email you have provided is already associated with an account.",
    });
  }

  if (error.name === "CastError") {
    const message = `Invalid value ${error.value} for ${error.path}`;
    res.status(400).json({
      status: "fail",
      message: message,
    });
  }
};

export const globalErrorHandler = (
  error: CustomErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    developmentError(error, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(error, res);
  }
};
