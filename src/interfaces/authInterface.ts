import { User } from "@prisma/client";

export type CreateUser = Omit<User, "id">;

export interface ICredentials {
  email: string;
  password: string;
}
