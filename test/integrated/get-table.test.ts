import request from 'supertest';
import config from '../../src/config';
import DatabaseManager from '../../src/services/database-manager';
import app from "../../src/app";
import { INTERNAL_TABLE_PREFIX, USER_TABLE_PREFIX } from '../../src/config/constant';

const userCreatedTableName = 'sample';
const internalTableName = 'internal';
jest.setTimeout(10000);

beforeAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([
     db.run(`DROP TABLE IF EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName}`),
    db.run(`DROP TABLE IF EXISTS ${INTERNAL_TABLE_PREFIX}${internalTableName}`)
    ])
    
});

afterAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([
        db.run(`DROP TABLE IF EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName}`),
        db.run(`DROP TABLE IF EXISTS ${INTERNAL_TABLE_PREFIX}${internalTableName}`)
    ])
});

describe("Test Get Table",()=>{
    it("should get table list", async ()=>{
        if(config.db) config.db = null;
        const db = new DatabaseManager();
        await db.initialize();
        await db.run(`CREATE TABLE IF NOT EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        await db.run(`CREATE TABLE IF NOT EXISTS ${INTERNAL_TABLE_PREFIX}${internalTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const response  = await request(app).get('/tables');
        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual(true);
        expect(response.body.data).toHaveLength(1)
        expect(config.db).not.toBeNull();
    });
    it("should get table detail using table name", async ()=>{
        if(config.db) config.db = null;
        const db = new DatabaseManager();
        await db.initialize();
        await db.run(`CREATE TABLE IF NOT EXISTS ${USER_TABLE_PREFIX}${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const response  = await request(app).get(`/tables/${userCreatedTableName}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual(true);
        expect(response.body.data).toEqual({
            name:userCreatedTableName,
            columns:[{name:"id",type:"INTEGER"},
            {name:"name",type:"TEXT"}]
        });
    });
    it("should return 404 given table not found", async ()=>{
        if(config.db) config.db = null;
        const db = new DatabaseManager();
        await db.initialize();
        const response  = await request(app).get(`/tables/${userCreatedTableName}__1`);
        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toEqual(false);
        expect(response.body.message).toEqual(`Table ${userCreatedTableName}__1 not found`);
    });
});