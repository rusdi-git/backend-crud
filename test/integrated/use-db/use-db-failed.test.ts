import request from 'supertest';
import config from '../../../src/config';
import DatabaseManager from '../../../src/services/database-manager';
import app from "../../../src/app";

const dbAll = jest.spyOn(DatabaseManager.prototype,"all");


describe("Test Get Table",()=>{
    it("should failed get tables given internal table not initialized and config db is null", async ()=>{
        if(config.db) config.db = null;        
        const response  = await request(app).get('/use-db/tables');
        expect(response.statusCode).toEqual(500);
        expect(response.body.status).toEqual(false);
        expect(response.body.message).toEqual("Internal Table Not Yet Ready");
        expect(config.db).not.toBeNull();
    });
    it("should failed get tables given internal table not initialized and config db is not null", async ()=>{
        const db = new DatabaseManager();
        await db.initialize();
        if(config.db) config.db = db;
        const response  = await request(app).get('/use-db/tables');
        expect(response.statusCode).toEqual(500);
        expect(response.body.status).toEqual(false);
        expect(response.body.message).toEqual("Internal Table Not Yet Ready");
    });
    it("should failed get tables given database manager error", async ()=>{
        if(config.db) config.db = null;
        dbAll.mockImplementationOnce(async ()=>{throw new Error("Failed access database")});
        const response  = await request(app).get('/use-db/tables');
        expect(response.statusCode).toEqual(500);
        expect(response.body.status).toEqual(false);
        expect(response.body.message).toEqual("Failed check database");
    });
});