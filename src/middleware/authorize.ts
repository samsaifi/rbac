import { NextFunction, Request, Response } from "express";
import { IRole, IUser } from "../types/types";
import createHttpError from "http-errors";

export const authorize = (requiredPermission: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(createHttpError(403, "Insufficient Permission"));
    }
    const user = req.user as IUser;
    if (!user || !user.role) {
      return next(createHttpError(403, "Forbidden : User role not found"));
    }
    const userRole = user.role as IRole;
    if (!Array.isArray(userRole.permissions)) {
      return next(
        createHttpError(500, "Internal Server Error: Invalid Role struct")
      );
    }
    const hasAllPermission = requiredPermission.every((permission) => {
      userRole.permissions.some((p) =>
        typeof p === "string" ? p === permission : p.name === permission
      );
    });
    if (!hasAllPermission) {
      return next(createHttpError(403, "Insufficient permissions"));
    }
    next();
  };
};
