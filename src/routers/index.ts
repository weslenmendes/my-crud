import { Router } from "express";

import authRouter from "./authRouter.js";
import crudRouter from "./crudRouter.js";

const router = Router();

router.use(authRouter);
router.use("/cruds", crudRouter);

export default router;
