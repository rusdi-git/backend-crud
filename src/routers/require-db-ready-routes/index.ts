import { Router } from "express";
import checkDatabase from "../../middleware/check-database";
import tableRouter from "./table";

const requireDbRouter = Router();
requireDbRouter.use(checkDatabase);
requireDbRouter.use('/tables',tableRouter);

export default requireDbRouter;