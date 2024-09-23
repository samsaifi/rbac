import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { _conf } from "../config/config";

export const errorHandler = async (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message,
    errStack: _conf.env === "development" ? err.stack : "",
  });
};
