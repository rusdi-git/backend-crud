export interface TableBase {
    name:string;
}

export type TableColumnType = "Text"|"Int"|"Date"|"Bool";
export type OriginalTableColumnType = "Text"|"Integer";

export interface OriginalTableColumn {
    name:string;
    type: OriginalTableColumnType;
    required?:boolean;
    primaryKey?:boolean;
}

export interface OriginalTableCreateParams {
    name:string;
    columns: OriginalTableColumn[];
    allowExist?:boolean;
    isInternal?:boolean;
}