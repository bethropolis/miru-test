import { DB, db, ExtensionSettingsDB } from "../db/db";

import {
  readExtensionMetaData,
  verExtensionMateData,
} from "../utils/extension";

export async function saveCurrent(code) {
    const current = readExtensionMetaData(code);
    if (!current || !verExtensionMateData(current)) return;

    const existing = await ExtensionSettingsDB.get(current.package);

    if (existing) {
        await db.extension.update(current.id, { ...current, script: code });
    } else {
        await db.extension.put({ ...current, script: code });
    }
}

export async function saveCurrentLocal(code){
    const current = readExtensionMetaData(code);
    if (!current || !verExtensionMateData(current)) return;

    if(DB.get('current')){
        DB.update('current', { ...current, script: code });
    }else{
        DB.set('current', { ...current, script: code });
    }
}