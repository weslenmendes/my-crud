import { Prisma } from "@prisma/client";

import prisma from "../config/database.js";

import { ICreateCrud } from "./../interfaces/crudInterface.js";

const insertCrud = async (CreateCrudData: ICreateCrud) => {
  const { content, label, lastKey, userId } = CreateCrudData;

  return prisma.crud.create({
    data: { content, label, lastKey, userId },
  });
};

const getCrudById = async (id: number) => {
  return prisma.crud.findFirst({ where: { id } });
};

const getCrudByLabelAndUserId = async (label: string, userId: number) => {
  return prisma.crud.findFirst({ where: { AND: [{ label }, { userId }] } });
};

const getCrudByIdAndUserId = async (id: number, userId: number) => {
  return prisma.crud.findFirst({ where: { AND: [{ id }, { userId }] } });
};

const getCrudsByUserId = async (userId: number) => {
  return prisma.crud.findMany({ where: { userId } });
};

const updateCrud = async (id: number, UpdateCrudData: ICreateCrud) => {
  const { content, label, lastKey, userId } = UpdateCrudData;

  return prisma.crud.update({
    where: { id },
    data: { content, label, lastKey, userId },
  });
};

const removeCrud = async (id: number) => {
  return prisma.crud.delete({ where: { id } });
};

const getRowsFilterByRowId = async (id: number, rowId: number) => {
  return prisma.crud.findMany({
    where: { AND: [{ id }, { content: { path: ["id"], not: rowId } }] },
  });
};

const insertOrUpdateColumn = async (
  id: number,
  contentData: Prisma.JsonArray,
) => {
  return prisma.crud.update({
    where: { id },
    data: { content: contentData },
  });
};

const insertOrUpdateRow = async (
  id: number,
  lastKey: number,
  contentData: Prisma.JsonArray,
) => {
  return prisma.crud.update({
    where: { id },
    data: { lastKey, content: contentData },
  });
};

export {
  insertCrud,
  getCrudById,
  getCrudByLabelAndUserId,
  getCrudByIdAndUserId,
  getCrudsByUserId,
  updateCrud,
  removeCrud,
  getRowsFilterByRowId,
  insertOrUpdateRow,
  insertOrUpdateColumn,
};
