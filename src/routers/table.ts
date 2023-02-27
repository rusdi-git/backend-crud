import { Router } from "express";
import config from "../config";
import { generateSuccessListResponse } from "../helpers/response";
import DatabaseManager from "../services/database-manager";
import TableManager from "../services/table-manager";

const tableRouter = Router();
tableRouter.get("/",async (req,res)=>{    
    const tableManager = new TableManager(config.db as DatabaseManager);
    const tables = await tableManager.list();
    return res.status(200).json(generateSuccessListResponse(tables));
});

export default tableRouter;