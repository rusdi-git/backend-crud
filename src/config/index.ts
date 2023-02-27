import DatabaseManager from "../services/database-manager"

interface IConfig {
    db:DatabaseManager|null
}

const config:IConfig = {
    db:null
}

export default config