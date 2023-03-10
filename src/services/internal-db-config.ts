import { INTERNAL_TABLE_NAME } from "../config/constant";
import { OriginalTableCreateParams } from "./type";

const internalDbConfig:Record<(typeof INTERNAL_TABLE_NAME)[number],OriginalTableCreateParams> = {
    column:{
        name:'column',
        allowExist:true,
        isInternal:true,
        columns:[
            {name:'id',type:"Integer",primaryKey:true},
            {name:'table_name',type:"Text",required:true},
            {name:'name',type:"Text",required:true},
            {name:'type',type:"Text",required:true},
            {name:'original_type',type:"Text",required:true},
            {name:'nullable',type:"Integer"},
        ]
    },migration:{
        name:'migration',
        allowExist:true,
        isInternal:true,
        columns:[
            {name:'id',type:"Integer",primaryKey:true},
            {name:'sql',type:"Text",required:true},
            {name:'done',type:"Integer"}
        ]
    },
}

export default internalDbConfig