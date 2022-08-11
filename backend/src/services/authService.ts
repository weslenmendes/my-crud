import { Users } from "@prisma/client";

import {
  createUser,
  getUserById,
  getUserByEmail,
} from "../repositories/userRepository.js";
import { generateError } from "../errors/errorGenerator.js";
import { ICredentials } from "./../interfaces/authInterface.js";
import { createToken, isValidToken, decodeToken } from "../utils/tokenUtils.js";
import { compare } from "../utils/cryptUtils.js";

export type CreateUser = Omit<Users, "id">;

const userExistsById = async (id: number) => {
  const userExists = await getUserById(id);

  if (!userExists) {
    throw generateError({
      type: "NotFoundError",
      message: "User does not exist.",
    });
  }

  return userExists;
};

const userExistsByEmail = async (email: string) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) {
    throw generateError({
      type: "NotFoundError",
      message: "User does not exist.",
    });
  }

  return userExists;
};

const signIn = async (credential: ICredentials) => {
  const userExists = await userExistsByEmail(credential.email);

  const isPasswordMatch = compare(userExists.password, credential.password);

  if (!isPasswordMatch) {
    throw generateError({
      type: "UnauthorizedError",
      message: "Passwords don't match.",
    });
  }

  const data = { userId: userExists.id };
  const token = createToken(data);

  return {
    userId: userExists.id,
    name: userExists.name,
    image: userExists.image,
    token: token.result,
  };
};

const signUp = async (user: CreateUser) => {
  const userExists = await getUserByEmail(user.email);

  if (userExists)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "User already exists.",
    });

  await createUser(user);
};

const validate = async (token: string) => {
  const result = isValidToken(token);

  if (!result.valid)
    throw generateError({
      type: "UnprocessableEntityError",
      message: result.message,
    });

  const data = decodeToken(token);
  await userExistsById(data.userId);
};

export { signIn, signUp, validate };
