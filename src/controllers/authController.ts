import { Request, Response } from "express";

import {
  signIn,
  signUp,
  validate,
  CreateUser,
} from "../services/authService.js";
import { ICredentials } from "./../interfaces/authInterface.js";

export const login = async (req: Request, res: Response) => {
  const credentials = req.body as ICredentials;

  const result = await signIn(credentials);

  res.send(result);
};

export const register = async (req: Request, res: Response) => {
  const newUser = req.body as CreateUser;

  await signUp(newUser);

  res.status(201).send({ message: "User created." });
};

export const validateSession = async (req: Request, res: Response) => {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];

  await validate(token);

  res.send({ message: "Session valid." });
};
