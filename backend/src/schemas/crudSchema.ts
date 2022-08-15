import Joi from "joi";

import { regex } from "../utils/constantsUtils.js";
import { ISchema } from "../interfaces/schemaInterface.js";

const messages = {
  label: "A label name is required.",
  labelPattern:
    "A label name must be alphanumeric and contain no spaces, with at least 3 characters.",
  columnName: "A columnName is required.",
  columnNamePattern:
    "A columnName must be alphanumeric and contain no spaces, with at least 3 characters.",
  id: "An id is required.",
  idPattern: "An id must be a number.",
  rowData: "A object rowData is required.",
};

export const createCrudSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.NAME).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "body",
};

export const createColumnSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
    columnName: Joi.string().pattern(regex.COLUMN_NAME).required().messages({
      "string.notEmpty": messages.columnName,
      "string.pattern.base": messages.columnNamePattern,
    }),
  }),
  local: "body",
};

export const createRowSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.id,
      "string.pattern.base": messages.idPattern,
    }),
  }),
  local: "body",
};

export const updateRowParamsSchema: ISchema = {
  schema: Joi.object().keys({
    id: Joi.string().pattern(regex.ID).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "params",
};

export const updateRowBodySchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
    rowData: Joi.object().required().messages({
      "object.empty": messages.rowData,
    }),
  }),
  local: "body",
};

export const getCrudParamsSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "params",
};

export const removeCrudParamsSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "params",
};

export const removeColumnParamsSchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "params",
};

export const removeColumnQuerySchema: ISchema = {
  schema: Joi.object().keys({
    columnName: Joi.string().pattern(regex.COLUMN_NAME).required().messages({
      "string.notEmpty": messages.columnName,
      "string.pattern.base": messages.columnNamePattern,
    }),
  }),
  local: "query",
};

export const removeRowParamsSchema: ISchema = {
  schema: Joi.object().keys({
    id: Joi.string().pattern(regex.ID).required().messages({
      "string.notEmpty": messages.id,
      "string.pattern.base": messages.idPattern,
    }),
  }),
  local: "params",
};

export const removeRowQuerySchema: ISchema = {
  schema: Joi.object().keys({
    label: Joi.string().pattern(regex.LABEL).required().messages({
      "string.notEmpty": messages.label,
      "string.pattern.base": messages.labelPattern,
    }),
  }),
  local: "query",
};
