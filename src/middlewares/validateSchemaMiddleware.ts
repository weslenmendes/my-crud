import { Request, Response, NextFunction } from "express";

import { generateError } from "../errors/errorGenerator.js";
import { ISchema } from "../interfaces/schemaInterface.js";

function validateSchema(modifiedSchema: ISchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { schema, local } = modifiedSchema;

    const result = schema.validate(req[local], {
      abortEarly: true,
    });

    if (result.error) {
      throw generateError({
        type: "UnprocessableEntityError",
        message: result.error.details
          .map((detail) => detail.message)
          .join(", "),
      });
    }

    next();
  };
}

export default validateSchema;
