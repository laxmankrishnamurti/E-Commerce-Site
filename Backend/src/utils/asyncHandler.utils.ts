import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const asyncHandler = (
  func: (
    req: Request,
    Res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: ErrorRequestHandler) => {
      next(error)
    });
  };
};

export default asyncHandler;
