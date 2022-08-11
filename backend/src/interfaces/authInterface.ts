import { Users } from "@prisma/client";

export type CreateUser = Omit<Users, "id">;

export interface ICredentials {
  email: string;
  password: string;
}
