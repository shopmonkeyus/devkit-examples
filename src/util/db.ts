import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export function readDatabase(id: string) {
  const db = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(db)[id];
}

export function writeDatabase(id: string, data: any) {
  const db = readDatabase(id);
  db[id] = data;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
