import { Schema } from "joi";

import { Local } from "../utils/typesUtils.js";

export interface ISchema {
  schema: Schema;
  local: Local;
}
