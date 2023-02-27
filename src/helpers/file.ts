import fs from 'fs';
import path from 'path';

export function checkPathExist(filePath:string) {
    const fullPath = getFullPath(filePath);
    return fs.existsSync(fullPath);
}

export function getFullPath(filePath:string) {
    if(path.isAbsolute(filePath)) return filePath
    return path.join(process.cwd(),filePath);
}