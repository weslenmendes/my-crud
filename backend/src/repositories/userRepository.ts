import prisma from "../config/database.js";

import { CreateUser } from "../services/authService.js";
import { encrypt } from "./../utils/cryptUtils.js";

const createUser = async (user: CreateUser) => {
  const { email, password, name, image } = user;
  const passwordEncrypted = encrypt(password);

  return await prisma.users.create({
    data: {
      name,
      image,
      email,
      password: passwordEncrypted,
    },
  });
};

const getUsers = async () => {
  return await prisma.users.findMany({});
};

const getUserById = async (id: number) => {
  return await prisma.users.findUnique({ where: { id } });
};

const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({ where: { email } });
};

const removeUser = async (id: number) => {
  return await prisma.users.delete({ where: { id } });
};

export { createUser, getUsers, getUserById, getUserByEmail, removeUser };
