import { NextFunction, Request, Response } from "express";
import mongoose, { Document } from "mongoose";

export type RouteFuncTypes = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IRole extends Document {
  name: string;
  permissions: mongoose.Types.ObjectId;
}

export interface IPermission extends Document {
  name: string;
  description: string;
}

export interface DecodedToken {
  userId: string;
}
