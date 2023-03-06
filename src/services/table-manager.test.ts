import { INTERNAL_TABLE_PREFIX, USER_TABLE_PREFIX } from "../config/constant";
import DatabaseManager from "./database-manager"
import TableManager from "./table-manager";
import { OriginalTableCreateParams } from "./type";

const userCreatedTableName = 'abcde';
const internalTableName = 'xyz';
const newTableName = 'new_table';

afterAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([
        db.run(`DROP TABLE IF EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName}`),
        db.run(`DROP TABLE IF EXISTS ${INTERNAL_TABLE_PREFIX}${internalTableName}`),
        db.run(`DROP TABLE IF EXISTS ${USER_TABLE_PREFIX}${newTableName}`)
    ])
});

describe("Table Manager Test Suite", ()=>{
    it("should list only user created table with name prefix with 'data__'",async () => {
        const db = new DatabaseManager();
        await db.initialize();        
        await db.run(`CREATE TABLE IF NOT EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        await db.run(`CREATE TABLE IF NOT EXISTS ${INTERNAL_TABLE_PREFIX}${internalTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const tableManager = new TableManager(db);
        const result = await tableManager.list();
        expect(result).toHaveLength(1);
        expect(result).toEqual([{name:userCreatedTableName}]);
    });
    it("should get detail table data given table name",async () => {
        const db = new DatabaseManager();
        await db.initialize();        
        await db.run(`CREATE TABLE IF NOT EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const tableManager = new TableManager(db);
        const result = await tableManager.detail(userCreatedTableName) as {name:string,columns:{name:string;type:string}[]};
        expect(result.name).toEqual(userCreatedTableName);
        expect(result.columns).toHaveLength(2);
        expect(result.columns).toEqual([
            {name:"id",type:"INTEGER"},
            {name:"name",type:"TEXT"}
        ]);
    });

    it("should create table given correct create params",async () => {
        const db = new DatabaseManager();
        await db.initialize();        
        const tableSchema:OriginalTableCreateParams = {
            name:newTableName,
            allowExist:true,
            columns:[
                {name:'id',type:"Integer",primaryKey:true},
                {name:'name',type:"Text",required:true},
                {name:'address',type:"Integer"}
            ]
        };
        const tableManager = new TableManager(db);
        await tableManager.create(tableSchema);
        const createdTable = await tableManager.detail(newTableName) as {name:string;columns:{name:string;type:string}[]};
        expect(createdTable).not.toBeNull();
        expect(createdTable.name).toEqual(newTableName);
        expect(createdTable.columns).toEqual([{name:"id",type:"INTEGER"},{name:"name",type:"TEXT"},{name:"address",type:"INTEGER"}]);
    });
})