import DatabaseManager from "./database-manager"
import TableManager from "./table-manager";

const userCreatedTableName = 'abcde';
const internalTableName = 'xyz';

afterAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([db.run(`DROP TABLE IF EXISTS data__${userCreatedTableName}`),db.run(`DROP TABLE IF EXISTS ${internalTableName}`)])
});

describe("Table Manager Test Suite", ()=>{
    it("should list only user created table with name prefix with 'data__'",async () => {
        const db = new DatabaseManager();
        await db.initialize();        
        await db.run(`CREATE TABLE IF NOT EXISTS data__${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        await db.run(`CREATE TABLE IF NOT EXISTS ${internalTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const tableManager = new TableManager(db);
        const result = await tableManager.list();
        expect(result).toHaveLength(1);
        expect(result).toEqual([{name:userCreatedTableName}]);
    });
})