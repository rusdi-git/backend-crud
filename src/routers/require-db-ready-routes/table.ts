import { Router } from "express";
import config from "../../config";
import { generateFailedResponse, generateSuccessListResponse, generateSuccessResponse } from "../../helpers/response";
import DatabaseManager from "../../services/database-manager";
import TableManager from "../../services/table-manager";

const tableRouter = Router();
tableRouter.get("/:tableName",async (req,res)=>{    
    const tableManager = new TableManager(config.db as DatabaseManager);
    const table = await tableManager.detail(req.params.tableName);
    if(table) return res.status(200).json(generateSuccessResponse(table));
    return res.status(404).json(generateFailedResponse(`Table ${req.params.tableName} not found`));
});
tableRouter.get("/",async (req,res)=>{    
    const tableManager = new TableManager(config.db as DatabaseManager);
    const tables = await tableManager.list();
    return res.status(200).json(generateSuccessListResponse(tables));
});

export default tableRouter;