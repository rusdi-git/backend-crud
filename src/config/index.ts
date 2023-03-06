import DatabaseManager from "../services/database-manager"

interface IConfig {
    db:DatabaseManager|null,
    migrate:boolean
}

const config:IConfig = {
    db:null,
    migrate:false
}

export default config