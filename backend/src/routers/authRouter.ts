import { Router } from "express";

import {
  login,
  register,
  validateSession,
} from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";
import { tokenSchema } from "../schemas/tokenSchema.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const authRouter = Router();

authRouter.get("/validate", validateSchema(tokenSchema), validateSession);
authRouter.post("/sign-up", validateSchema(registerSchema), register);
authRouter.post("/", validateSchema(loginSchema), login);

export default authRouter;
