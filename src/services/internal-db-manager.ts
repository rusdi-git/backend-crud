import config from "../config";
import { INTERNAL_TABLE_NAME, INTERNAL_TABLE_PREFIX } from "../config/constant";
import DatabaseManager from "./database-manager";
import internalDbConfig from "./internal-db-config";
import TableManager from "./table-manager";

export default class InternalDbManager {
    async initialize() {
        const db = new DatabaseManager();
        await db.initialize();
        const tableManager = new TableManager(db);
        console.log('Begin initialize internal tables');
        for (const name in internalDbConfig) {
            console.log(`Create table ${name}`);
            const config = internalDbConfig[name as (typeof INTERNAL_TABLE_NAME)[number]];
            await tableManager.create(config);
        }
        config.internalTableReady = true;
        console.log('Finish initialize internal table');
    }

    async remove() {
        const db = new DatabaseManager();
        await db.initialize();
        console.log('Begin remove internal tables');
        for (const name in internalDbConfig) {
            console.log(`Remove table ${name}`);
            await db.run(`DROP TABLE IF EXISTS ${INTERNAL_TABLE_PREFIX}${name}`);
        }
        console.log('Finish remove internal table');
    }
}