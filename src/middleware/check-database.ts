import {Request, Response, NextFunction} from 'express';
import config from '../config';
import { generateFailedResponse } from '../helpers/response';
import DatabaseManager from '../services/database-manager';


export default async function checkDatabase(req:Request,res:Response,next:NextFunction) {
    try {
        if(!config.db) {
            const db = new DatabaseManager();
            await db.initialize();
            config.db = db;
        }        
    } catch (error) {
        return res.status(500).json(generateFailedResponse("Failed initialize database"));
    }    
    next();
}