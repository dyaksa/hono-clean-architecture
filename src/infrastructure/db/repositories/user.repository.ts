import { User } from "../../../domain/entities/user.entities";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { Database } from "..";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";

export class UserRepositoryImpl implements UserRepository {
  constructor(private database: Database) {}

  async create(user: Omit<User, "id">): Promise<User> {
    const db = this.database.getConnection();
    const newUser = await db.insert(users).values(user).returning();
    return newUser[0];
  }

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User> {
    const db = this.database.getConnection();
    const existUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return existUser[0];
  }

  async findByUsername(username: string): Promise<User> {
    const db = this.database.getConnection();
    const exisUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return exisUsername[0];
  }

  findAll(filter: Map<string, string>[]): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
