import { Crud, Prisma } from "@prisma/client";

export type CreateCrud = Omit<Crud, "id">;

export type PartialCrud = Partial<Crud>;

export interface ICreateCrud {
  label: string;
  userId: number;
  content: Prisma.JsonArray;
  lastKey: number;
}
