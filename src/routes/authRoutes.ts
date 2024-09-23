import express from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import { schema, validate } from "../middleware/validate";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const router = express.Router();

router.post("/register", validate(schema.registerUser), register);
router.post("/login", validate(schema.loginUser), login);
router.get(
  "/protected",
  authenticate,
  authorize(["read:protected"]),
  protectedRoute
);

export default router;
