import {
  Database,
  DataTypes,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb@v1.4.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();
const host = env.POSTGRES_HOST;
const username = env.POSTGRES_USER;
const password = env.POSTGRES_PASSWORD;
const database = env.POSTGRES_DB;
//Todo: create the db 
class PostgresDB {
  private static instance: PostgresDB;
  private db: Database;

  private constructor() {
    const connection = new PostgresConnector({
      host: host,
      username: username,
      password: password,
      database: database,
    });

    this.db = new Database(connection);
  }

  public static getInstance(): PostgresDB {
    if (!PostgresDB.instance) {
      PostgresDB.instance = new PostgresDB();
    }
    return PostgresDB.instance;
  }

  public getDatabase(): Database {
    return this.db;
  }

  public async sync(models: typeof Model[]): Promise<void> {
    this.db.link(models);
    await this.db.sync();
  }
}

export default PostgresDB;
