import { MongoClient } from "mongodb";
import "dotenv/config.js";

let _client = undefined;

export async function dbInit() {
  if (_client) {
    console.log("Database already initialized");
    return true;
  }

  try {
    _client = await MongoClient.connect(process.env.DB_CONNECTION_URI);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function getDbClient() {
  if (!_client) throw new Error("Database not initialized.");

  return _client;
}
