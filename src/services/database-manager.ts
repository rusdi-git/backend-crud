import { Database } from "sqlite3";
import { getFullPath } from "../helpers/file";

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

    async run(query:string) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise(function (resolve,reject){
            db.run(query,function (err){
                if(err) return reject(err);
                return resolve(true);
            });
        });
    }

    async get(query:string) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise(function (resolve,reject){
            db.get(query,function (err,row){
                if(err) return reject(err);
                return resolve(row);
            });
        });
    }

    async all(query:string) {
        if(this.db===undefined) throw new Error('DB not yet initialized');
        const db = this.db;
        return new Promise(function (resolve,reject){
            db.all(query,function (err,rows){
                if(err) return reject(err);
                return resolve(rows);
            });
        });
    }
}