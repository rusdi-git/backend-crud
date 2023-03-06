import {Request, Response, NextFunction} from 'express';
import config from '../config';
import { INTERNAL_TABLE_NAME, INTERNAL_TABLE_PREFIX } from '../config/constant';
import { generateFailedResponse } from '../helpers/response';
import DatabaseManager from '../services/database-manager';
import internalDbConfig from '../services/internal-db-config';
import TableManager from '../services/table-manager';


export default async function checkDatabase(req:Request,res:Response,next:NextFunction) {
    try {
        if(!config.db) {
            const db = new DatabaseManager();
            await db.initialize();
            config.db = db;       
            // const tableManager = new TableManager(db);
            // const internalTableClause:string[] = [];
            // const internalTableParams:string[]=[];
            // INTERNAL_TABLE_NAME.forEach(i=>{
            //     internalTableClause.push('?');
            //     internalTableParams.push(`${INTERNAL_TABLE_PREFIX}${i}`);
            // });
            // const internalTables = await db.all<{name:string}>(`SELECT name FROM sqlite_master WHERE name IN (${internalTableClause.join(',')})`,internalTableParams);
            // if(INTERNAL_TABLE_NAME.length!==internalTables.length) {
            //     const currentInternalTableNames = internalTables.map(i=>i.name);
            //     for (let i = 0; i < INTERNAL_TABLE_NAME.length; i++) {
            //         if(!currentInternalTableNames.includes(INTERNAL_TABLE_NAME[i])) {
            //             await tableManager.create(internalDbConfig[INTERNAL_TABLE_NAME[i]]);
            //         }
            //     }
            // }
        } 
    } catch (error) {
        return res.status(500).json(generateFailedResponse("Failed initialize database"));
    }    
    next();
}