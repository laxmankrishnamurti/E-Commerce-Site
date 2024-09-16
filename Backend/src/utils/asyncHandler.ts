import { error } from "console";
import { Request, Response, NextFunction } from "express";

const asyncHandler = (requestHandler) => {
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

// const asyncHandler = (fun) => async (req: Request, res: Response) => {
//   try {
//     await fun(req, res.next);
//   } catch (error) {
//     res.json({
//       success: false,
//       Error: error,
//     });
//   }
// };
