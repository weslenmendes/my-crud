import { Prisma } from "@prisma/client";

import {
  insertCrud,
  removeCrud,
  insertOrUpdateColumn,
  insertOrUpdateRow,
} from "../repositories/crudRepository.js";
import { generateError } from "../errors/errorGenerator.js";
import { generateCrud } from "../factories/crudFactory.js";

import {
  checkIfCrudExists,
  checkIfCrudDoesNotExists,
  checkIfExistsDataToEdit,
  checkIfHaveId,
  checkIfHaveLabel,
  checkIfUserExists,
} from "../utils/checksUtils.js";

export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | Prisma.JsonObject
  | Prisma.JsonArray;

const initialContent = {
  id: 1,
  column: "",
};

export const addCrud = async (label: string, userId: number) => {
  checkIfHaveLabel(label);

  await checkIfUserExists(userId);
  await checkIfCrudDoesNotExists(label, userId);

  const content = [{ id: 1, ...initialContent }] as Prisma.JsonArray;
  const lastKey = content[0]["id"];

  const newCrud = generateCrud(label, userId, content, lastKey);

  const crudInserted = await insertCrud(newCrud);

  return { id: crudInserted.id };
};

export const getCrud = async (label: string, userId: number) => {
  checkIfHaveLabel(label);
  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  return crudExists.content;
};

export const deleteCrud = async (label: string, userId: number) => {
  checkIfHaveLabel(label);

  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  await removeCrud(crudExists.id);

  return { message: "Crud successfully deleted." };
};

export const addColumn = async (
  label: string,
  userId: number,
  columnName: string,
) => {
  checkIfHaveLabel(label);

  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  checkIfExistsDataToEdit(crudExists);

  const arrContent = crudExists.content as Prisma.JsonArray;
  const columns = Object.keys(arrContent[0]);

  const thisColumnExists = columns.includes(columnName);

  if (thisColumnExists)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This column already exists.",
    });

  arrContent.forEach((el) => {
    el[columnName] = "";
  });

  await insertOrUpdateColumn(crudExists.id, arrContent);

  return { message: "Column successfully added" };
};

export const removeColumn = async (
  label: string,
  userId: number,
  columnName: string,
) => {
  checkIfHaveLabel(label);

  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  checkIfExistsDataToEdit(crudExists);

  const arrContent = crudExists.content as Prisma.JsonArray;
  const columns = Object.keys(arrContent[0]);

  const thisColumnExists = columns.includes(columnName);

  if (!thisColumnExists)
    throw generateError({
      type: "NotFoundError",
      message: "This column does not exists.",
    });

  arrContent.forEach((el) => {
    delete el[columnName];
  });

  await insertOrUpdateColumn(crudExists.id, arrContent);

  return { message: "Column successfully removed." };
};

export const addRow = async (label: string, userId: number) => {
  checkIfHaveLabel(label);

  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  checkIfExistsDataToEdit(crudExists);

  const arrContent = crudExists.content as Prisma.JsonArray;
  const actualLastKey = crudExists.lastKey;

  const columns = Object.keys(arrContent[0]);
  const newRow = {};

  columns.forEach((name) => {
    newRow[name] = "";

    if (name === "id") {
      newRow[name] = actualLastKey + 1;
    }
  });

  arrContent.push(newRow);

  const newLastKey = actualLastKey + 1;

  const updatedCrud = await insertOrUpdateRow(
    crudExists.id,
    newLastKey,
    arrContent,
  );

  return updatedCrud.content;
};

export const removeRow = async (id: number, label: string, userId: number) => {
  checkIfHaveId(id);

  checkIfHaveLabel(label);

  await checkIfUserExists(userId);

  const crudExists = await checkIfCrudExists(label, userId);

  checkIfExistsDataToEdit(crudExists);

  const arrContent = crudExists.content as Prisma.JsonArray;
  const rowExists = arrContent.find((el) => el["id"] === id);

  if (!rowExists)
    throw generateError({
      type: "NotFoundError",
      message: "This row does not exists.",
    });

  const newArrContent = arrContent.filter((element) => element["id"] !== id);
  const newArrContentLength = newArrContent.length;

  const newLastKey = newArrContent[newArrContentLength - 1]["id"];

  const updatedCrud = await insertOrUpdateRow(
    crudExists.id,
    newLastKey,
    newArrContent,
  );

  return { message: "Row successfully removed." };
};

export const updateRow = async (
  rowId: number,
  label: string,
  userId: number,
  rowData: object,
) => {
  checkIfHaveId(rowId);

  await checkIfUserExists(userId);

  if (!rowData) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: "An object with data is required.",
    });
  }

  const crudExists = await checkIfCrudExists(label, userId);

  checkIfExistsDataToEdit(crudExists);

  const arrContent = crudExists.content as Prisma.JsonArray;
  const lastKey = crudExists.lastKey;

  const columns = Object.keys(arrContent[0]);
  const columnsData = Object.keys(rowData);

  columnsData.forEach((column) => {
    if (!columns.includes(column) || column === "id")
      throw generateError({
        type: "UnprocessableEntityError",
        message: `Table does not contain ${column} column`,
      });
  });

  const rowExists = arrContent.find((element) => element["id"] === rowId);

  if (!rowExists)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This row does not exists.",
    });

  const updatedContent = arrContent.map((row) => {
    if (row["id"] === rowId) {
      return { id: rowId, ...rowData };
    }

    return row;
  });

  const updatedCrud = await insertOrUpdateRow(
    crudExists.id,
    lastKey,
    updatedContent,
  );

  return { message: "Row successfully updated." };
};
