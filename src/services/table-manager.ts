import DatabaseManager from "./database-manager";

export default class TableManager {
    private db:DatabaseManager;

    constructor(db:DatabaseManager) {
        this.db = db;
    }

    async list() {
        const data = await this.db.all(`SELECT name FROM sqlite_master WHERE type = 'table' AND name LIKE 'data__%'`) as {name:string}[];
        return data.map(i=>{return {name:i.name.slice(6)}});
    }
}