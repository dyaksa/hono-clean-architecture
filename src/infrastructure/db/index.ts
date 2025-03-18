import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export interface Database {
  getConnection(): NodePgDatabase<Record<string, never>>;
}

export class PostgresqlConnection implements Database {
  private pool: Pool;

  constructor(database_url: string | undefined = process.env.DATABASE_URL) {
    this.pool = new Pool({
      connectionString: database_url,
      ssl: false,
    });
  }

  getConnection(): NodePgDatabase<Record<string, never>> {
    return drizzle(this.pool);
  }
}
