import DatabaseManager from "../services/database-manager"

interface IConfig {
    db:DatabaseManager|null;
    migrate:boolean;
    internalTableReady:boolean;
}

const config:IConfig = {
    db:null,
    migrate:false,
    internalTableReady:true
}

export default config