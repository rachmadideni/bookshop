import { Request, Response, NextFunction } from "express";
import { ApiError } from "./api-error";

export default class ErrorHandler {
  static handle = () => {
    return async (
      err: ApiError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({
        status: false,
        message: err.message,
        errors: err.errors ?? [],
      });
    };
  };
}
