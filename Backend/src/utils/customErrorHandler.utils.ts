import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const globalErrorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
