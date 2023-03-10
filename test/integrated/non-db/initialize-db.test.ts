import request from 'supertest';
import app from "../../../src/app";
import config from '../../../src/config';
import { INTERNAL_TABLE_NAME, INTERNAL_TABLE_PREFIX } from '../../../src/config/constant';
import DatabaseManager from "../../../src/services/database-manager";
import InternalDbManager from "../../../src/services/internal-db-manager";

beforeEach(async ()=>{
    await new InternalDbManager().remove();
});
afterEach(async ()=>{
    await new InternalDbManager().remove();
});

const initializeDb = jest.spyOn(InternalDbManager.prototype,"initialize");

describe("Test Initialize Db Routes",()=>{
    it("should create all internal tables and set database config as ready",async ()=>{
        const response  = await request(app).post('/non-db/initialize-db');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual(null);
        expect(config.internalTableReady).toEqual(true);
        const db = new DatabaseManager();
        await db.initialize();
        const internalTablesCount = await db.get<{total:number}>(`SELECT count(name) AS total FROM sqlite_master WHERE name LIKE '${INTERNAL_TABLE_PREFIX}%'`);
        expect(internalTablesCount.total).toEqual(INTERNAL_TABLE_NAME.length);
    });
    it("should return internal 500 given internal db manager throw error", async ()=>{
        const errorMessage = "Failed Initialize Db";
        initializeDb.mockImplementationOnce(()=>{throw new Error(errorMessage)});
        const response  = await request(app).post('/non-db/initialize-db');
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual(errorMessage)
    });
})