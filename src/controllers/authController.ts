import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import createHttpError from "http-errors";
import { generateToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role } = req.body;
    const userexists = await User.findOne({ email });
    if (userexists) {
      return next(createHttpError(400, "Email already exists"));
    }
    const user = new User({ username, email, password, role });
    await user.save();

    return res.status(201).json({
      status: true,
      message: "User register Successfully",
      _id: user._id,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while register user"));
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return next(createHttpError(404, "Error while checking user exists"));
    }
    const passwordCheck = await user.comparePassword(password);
    if (!passwordCheck) {
      return next(createHttpError(401, "Error while password does't matched"));
    }
    const token = generateToken(user);
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email,
      status: true,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while login user"));
  }
};
export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    status: false,
    message: "This is a protect rote",
    user: req.user,
  });
};
