import { Request, Response, NextFunction } from "express";

import { getUserById } from "../repositories/userRepository.js";

import { isValidToken, decodeToken } from "../utils/tokenUtils.js";
import { generateError } from "../errors/errorGenerator.js";
import tokenSchema from "../schemas/tokenSchema.js";

async function tokenValidator(req: Request, res: Response, next: NextFunction) {
  const { error } = tokenSchema.validate(req.headers, {
    abortEarly: false,
  });

  if (error) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }

  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];

  if (!token) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: "No token provided.",
    });
  }

  const result = isValidToken(token);

  if (!result.valid) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: result.message,
    });
  }

  const data = decodeToken(token);

  const user = await getUserById(+data.userId);

  if (!user) {
    throw generateError({
      type: "NotFoundError",
      message: "User not found.",
    });
  }

  res.locals.user = user;

  next();
}

export default tokenValidator;
