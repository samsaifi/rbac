import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { _conf } from "../config/config";
import { DecodedToken, IUser } from "../types/types";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      return next(createHttpError(401, "Token not available"));
    }
    const decoded = jwt.verify(
      token,
      _conf.jwt_secret as string
    ) as DecodedToken;
    const user = await User.findOne({ _id: decoded.userId }).populate("role");
    if (!user) {
      return next(createHttpError(401, "Invalid Authorization"));
    }
    req.user = user;
  } catch (error) {
    return next(createHttpError(401, "Invalid Token"));
  }
};
