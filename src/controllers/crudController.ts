import { Request, Response } from "express";

import {
  addCrud,
  getCrud,
  getCruds,
  deleteCrud,
  addColumn,
  removeColumn as removeColumnCrud,
  removeRow as removeRowCrud,
  updateRow as updateRowCrud,
  addRow,
} from "../services/crudService.js";

export const createCrud = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label } = req.body;

  const crudCreated = await addCrud(label, +user.id);

  res.status(201).send(crudCreated);
};

export const getCrudByLabel = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label } = req.params;

  const crud = await getCrud(label, +user.id);

  res.status(200).send(crud);
};

export const getAllCrudsByUserId = async (req: Request, res: Response) => {
  const { user } = res.locals;

  const allCrud = await getCruds(+user.id);

  res.status(200).send(allCrud);
};

export const removeCrud = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label } = req.params;

  const message = await deleteCrud(label, +user.id);

  res.status(200).send(message);
};

export const createColumn = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label, columnName } = req.body;

  const updatedCrud = await addColumn(label, +user.id, columnName);

  res.status(200).send(updatedCrud);
};

export const removeColumn = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label } = req.params;
  const { columnName } = req.query as { columnName: string };

  const updatedCrud = await removeColumnCrud(label, user.id, columnName);

  res.status(200).send(updatedCrud);
};

export const createRow = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { label } = req.body;

  const updatedCrud = await addRow(label, +user.id);

  res.status(200).send(updatedCrud);
};

export const updateRow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const { label, rowData } = req.body;

  const newCrud = await updateRowCrud(+id, label, +user.id, rowData);

  res.status(200).send(newCrud);
};

export const removeRow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const { label } = req.query as { label: string };

  const newCrud = await removeRowCrud(+id, label, +user.id);

  res.status(200).send(newCrud);
};
