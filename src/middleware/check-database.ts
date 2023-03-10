import {Request, Response, NextFunction} from 'express';
import config from '../config';
import { INTERNAL_TABLE_NAME, INTERNAL_TABLE_PREFIX } from '../config/constant';
import { generateFailedResponse } from '../helpers/response';
import DatabaseManager from '../services/database-manager';


export default async function checkDatabase(req:Request,res:Response,next:NextFunction) {
    try {
        if(!config.db) {
            const db = new DatabaseManager();
            await db.initialize();
            config.db = db;       
            const internalTableClause:string[] = [];
            const internalTableParams:string[]=[];
            INTERNAL_TABLE_NAME.forEach(i=>{
                internalTableClause.push('?');
                internalTableParams.push(`${INTERNAL_TABLE_PREFIX}${i}`);
            });
            const internalTables = await db.all<{name:string}>(`SELECT name FROM sqlite_master WHERE name IN (${internalTableClause.join(',')})`,internalTableParams);
            if(INTERNAL_TABLE_NAME.length!==internalTables.length) {
                config.internalTableReady = false;
                return res.status(500).json(generateFailedResponse("Internal Table Not Yet Ready"));
            }
        }
        if(!config.internalTableReady) {
            return res.status(500).json(generateFailedResponse("Internal Table Not Yet Ready"));
        }
    } catch (error) {
        return res.status(500).json(generateFailedResponse("Failed check database"));
    }    
    next();
}