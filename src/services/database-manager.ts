import { Database } from "sqlite3";
import { getFullPath } from "../helpers/file";

type IParams = Record<string,number|string>|(number|string)[]

export default class DatabaseManager {
    private dbPath:string;
    private db:Database|undefined;

    constructor() {
        this.dbPath = getFullPath(process.env.DB_FILE||"data.db");
    }

    async initialize() {
        return new Promise((resolve,reject)=>{
            const db = new Database(this.dbPath,(err)=>{
                if(err) return reject(err);
                this.db = db;
                return resolve(true)
            })
        });
    }

    async run(query:string,params:IParams=[]) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise(function (resolve,reject){
            db.run(query,params,function (err){
                if(err) return reject(err);
                return resolve(this.changes);
            });
        });
    }

    async get<T=unknown>(query:string,params:IParams=[]) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise<T>(function (resolve,reject){
            db.get(query,params,function (err,row){
                if(err) return reject(err);
                return resolve(row);
            });
        });
    }

    async all<T=unknown>(query:string,params:IParams=[]) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise<T[]>(function (resolve,reject){
            db.all(query,params,function (err,rows){
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }
}