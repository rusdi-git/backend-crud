import { INTERNAL_TABLE_PREFIX, USER_TABLE_PREFIX } from "../config/constant";
import DatabaseManager from "./database-manager";
import { TableBase, OriginalTableCreateParams } from "./type";

export default class TableManager {
    private db:DatabaseManager;

    constructor(db:DatabaseManager) {
        this.db = db;
    }

    async list() {
        const data = await this.db.all(`SELECT name FROM sqlite_master WHERE type = 'table' AND name LIKE '${USER_TABLE_PREFIX}%'`) as TableBase[];
        return data.map(i=>{return {name:i.name.slice(6)}});
    }

    async detail(tableName:string) {
        let result:{name:string,columns:{name:string,type:string}[]}|null = null;
        const columns = await this.db.all(`SELECT name, type FROM PRAGMA_TABLE_INFO(?);`,[`${USER_TABLE_PREFIX}${tableName}`]) as {name:string;type:string}[];
        if(columns.length) {
            result = {
                name:tableName,
                columns
            };
        }
        return result
    }

    async create(params:OriginalTableCreateParams) {        
        const columnClause:string[]=[];
        params.columns.forEach((i)=>{
            columnClause.push(`${i.name} ${i.type}${i.required?' NOT NULL':''}${i.primaryKey?' PRIMARY KEY':''}`);
        });
        const query = `CREATE TABLE${params.allowExist?` IF NOT EXISTS`:''} ${params.isInternal?`${INTERNAL_TABLE_PREFIX}${params.name}`:`${USER_TABLE_PREFIX}${params.name}`} (${columnClause.join(',')}) STRICT`;
        await this.db.run(query);
    }
}