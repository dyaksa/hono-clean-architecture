import { User } from "../entities/user.entities";

export interface UserRepository {
  create(user: Omit<User, "id">): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findAll(filter: Map<string, string>[]): Promise<User[]>;
}
