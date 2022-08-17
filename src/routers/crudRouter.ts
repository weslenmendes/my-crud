import { Router } from "express";

import {
  createCrud,
  getCrudByLabel,
  getAllCrudsByUserId,
  removeCrud,
  createColumn,
  removeColumn,
  createRow,
  updateRow,
  removeRow,
} from "../controllers/crudController.js";

import authValidator from "../middlewares/authValidatorMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import {
  createCrudSchema,
  getCrudParamsSchema,
  createColumnSchema,
  createRowSchema,
  updateRowBodySchema,
  updateRowParamsSchema,
  removeCrudParamsSchema,
  removeColumnParamsSchema,
  removeColumnQuerySchema,
  removeRowParamsSchema,
  removeRowQuerySchema,
} from "../schemas/crudSchema.js";

const crudRouter = Router();

crudRouter.use(authValidator);

crudRouter.get("/:label?", validateSchema(getCrudParamsSchema), getCrudByLabel);

crudRouter.get("/visualize/all", getAllCrudsByUserId);

crudRouter.post("/create", validateSchema(createCrudSchema), createCrud);

crudRouter.post(
  "/create/column",
  validateSchema(createColumnSchema),
  createColumn,
);

crudRouter.post("/create/row", validateSchema(createRowSchema), createRow);

crudRouter.put(
  "/update/row/:id?",
  validateSchema(updateRowParamsSchema),
  validateSchema(updateRowBodySchema),
  updateRow,
);

crudRouter.delete(
  "/:label?",
  validateSchema(removeCrudParamsSchema),
  removeCrud,
);

crudRouter.delete(
  "/column/:label?",
  validateSchema(removeColumnParamsSchema),
  validateSchema(removeColumnQuerySchema),
  removeColumn,
);

crudRouter.delete(
  "/remove/row/:id?",
  validateSchema(removeRowParamsSchema),
  validateSchema(removeRowQuerySchema),
  removeRow,
);

export default crudRouter;
