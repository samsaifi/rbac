import jwt from "jsonwebtoken";
import { IUser } from "../types/types";
import { _conf } from "../config/config";

export const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, _conf.jwt_secret as string, {
    expiresIn: "1d",
  });
};
