import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { Sequelize } from "Sequelize";

const env = config();
const username = env.POSTGRES_USER;
const password = env.POSTGRES_PASSWORD;
const database = env.POSTGRES_DB;

class PostgresDB {
  private static instance: PostgresDB;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(database, username, password, {
      host: 'localhost',
      dialect: 'postgres',
    });
    }

  public static getInstance(): PostgresDB {
    if (!PostgresDB.instance) {
      PostgresDB.instance = new PostgresDB();
    }
    return PostgresDB.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async sync(): Promise<void> {
    await this.sequelize.sync();
  }
}

export {PostgresDB};