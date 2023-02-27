import request from 'supertest';
import config from '../../src/config';
import DatabaseManager from '../../src/services/database-manager';
import app from "../../src/app";

const userCreatedTableName = 'sample';
const internalTableName = 'internal';

beforeAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([
     db.run(`DROP TABLE IF EXISTS data__${userCreatedTableName}`),
    db.run(`DROP TABLE IF EXISTS ${internalTableName}`)
    ])
    
});

afterAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await Promise.all([
        db.run(`DROP TABLE IF EXISTS data__${userCreatedTableName}`),
        db.run(`DROP TABLE IF EXISTS ${internalTableName}`)
    ])
});

describe("Test Get Table",()=>{
    it("should get table list", async ()=>{
        if(config.db) config.db = null;
        const db = new DatabaseManager();
        await db.initialize();
        await db.run(`CREATE TABLE IF NOT EXISTS data__${userCreatedTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        await db.run(`CREATE TABLE IF NOT EXISTS ${internalTableName} (id INTEGER PRIMARY KEY, name TEXT)`);
        const response  = await request(app).get('/tables');
        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual(true);
        expect(response.body.data).toHaveLength(1)
        expect(config.db).not.toBeNull();
    });
});