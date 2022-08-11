import { Request, Response, NextFunction } from "express";

import { errorDetailsGenerator } from "../errors/errorGenerator.js";

function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { statusCode, message } = errorDetailsGenerator(err);

  if (message) {
    return res.status(statusCode).json({ message });
  }

  res.sendStatus(statusCode);
}

export default errorHandler;
