import Joi from "joi";

import { regex } from "../utils/constantsUtils.js";

const messages = {
  label: "Um nome é necessário.",
  labelPattern:
    "O nome deve conter apenas letras, números, underline ou traço, com no mínimo 3 caracteres.",
  columnName: "Um nome é necessário.",
  columnNamePattern:
    "O nome da coluna deve ser composto apenas por letras, números e underlines, com no mínimo 3 caracteres.",
  id: "Um id é necessário.",
  idPattern:
    "O id deve ser composto apenas por números, com no mínimo 1 caracteres.",
  rowData: "Um dado é necessário.",
};

export const CreateCrudSchema = Joi.object().keys({
  label: Joi.string().pattern(regex.LABEL).required().messages({
    "string.notEmpty": messages.label,
    "string.pattern.base": messages.labelPattern,
  }),
});

export const CreateColumnSchema = Joi.object().keys({
  columnName: Joi.string().pattern(regex.COLUMN_NAME).required().messages({
    "string.notEmpty": messages.columnName,
    "string.pattern.base": messages.columnNamePattern,
  }),
});

export const CreateRowSchema = Joi.object().keys({
  label: Joi.string().pattern(regex.LABEL).required().messages({
    "string.notEmpty": messages.label,
    "string.pattern.base": messages.labelPattern,
  }),
});
