import DatabaseManager from "./database-manager"

beforeAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await db.run(`DROP TABLE IF EXISTS dummy`);
});
afterAll(async ()=>{
    const db = new DatabaseManager();
    await db.initialize();
    await db.run(`DROP TABLE IF EXISTS dummy`);
});

describe("Database Manager Test Suite",()=>{
    it("should access current database", async ()=>{
        const db = new DatabaseManager();
        await db.initialize();
        await db.run('CREATE TABLE IF NOT EXISTS dummy (id INTEGER PRIMARY KEY, name TEXT)');
        await db.run(`INSERT INTO dummy (name) VALUES ('a'),('b')`);
        const oneResult = await db.get(`SELECT * FROM dummy`) as {id:number,name:string};
        expect(oneResult).toHaveProperty('id');
        expect(oneResult['id']).toEqual(1);
        const allResult = await db.all(`SELECT * FROM dummy`);
        expect(allResult).toEqual([{id:1,name:'a'},{id:2,name:'b'}]);
    });
    it("should throw error given database not yet initialzied", async ()=>{
        const db = new DatabaseManager();
        expect(db.run('SELECT 1+1')).rejects.toThrowError();
        expect(db.get('SELECT 1+1')).rejects.toThrowError();
        expect(db.all('SELECT 1+1')).rejects.toThrowError();
    });
})