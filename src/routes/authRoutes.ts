import express from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import { schema, validate } from "../middleware/validate";

export const router = express.Router();

router.post("/register", validate(schema.registerUser), register);
router.post("/login", validate(schema.loginUser), login);
router.get("/protected", authenticate, protectedRoute);

export default router;
