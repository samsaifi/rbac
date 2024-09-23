import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }
    next();
  };
};

export const schema = {
  registerUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    role: Joi.string().required(),
  }),
  loginUser: Joi.object({
    email: Joi.string().email().required(),
    passwrod: Joi.string().required(),
  }),
};
