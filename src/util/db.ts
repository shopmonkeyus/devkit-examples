import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export function readDatabase(id: string, table: string) {
  const db = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(db)?.[table]?.[id];
}

export function writeDatabase(id: string, table: string, data: any) {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  db[table][id] = data;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
