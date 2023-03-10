import { Router } from "express";
import initializeDbRouter from "./initialize-db";

const nonDbRouter = Router();
nonDbRouter.use('/initialize-db',initializeDbRouter);

export default nonDbRouter;