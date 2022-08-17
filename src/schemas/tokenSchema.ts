import Joi from "joi";

import { regex } from "../utils/constantsUtils.js";
import { ISchema } from "../interfaces/schemaInterface.js";

export const tokenSchema: ISchema = {
  schema: Joi.object({
    authorization: Joi.string().pattern(regex.TOKEN).required(),
  })
    .messages({
      "string.base": "Authorization header must be a string.",
      "string.pattern.base": "Invalid token.",
      "string.pattern.base.required": "Token is required.",
    })
    .options({
      allowUnknown: true,
    }),
  local: "headers",
};
