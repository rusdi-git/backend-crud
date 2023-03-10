import { INTERNAL_TABLE_NAME, INTERNAL_TABLE_PREFIX } from "../config/constant";
import DatabaseManager from "./database-manager";
import InternalDbManager from "./internal-db-manager";

describe("Internal Db Manager Test Suite",()=>{
    it("should create all internal database using internal db schema", async ()=>{
        const db = new DatabaseManager();
        await db.initialize();
        const currentInternalTables = await countInternalTables(db);
        expect(currentInternalTables.total).toEqual(0);
        const internalDbManager = new InternalDbManager();
        await internalDbManager.initialize();
        const updatedInternalTables = await countInternalTables(db);
        expect(updatedInternalTables.total).toEqual(INTERNAL_TABLE_NAME.length);
        await internalDbManager.remove();
        const clrearedInternalTables = await countInternalTables(db);
        expect(clrearedInternalTables.total).toEqual(0);
    });
});

async function countInternalTables(db:DatabaseManager) {
    return await db.get<{total:number}>(`SELECT count(name) AS total FROM sqlite_master WHERE name LIKE '${INTERNAL_TABLE_PREFIX}%'`);
}