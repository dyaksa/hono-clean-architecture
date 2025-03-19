import { Database } from "..";
import { Article } from "../../../domain/entities/article.entities";
import { ArticleRepository } from "../../../domain/repositories/article.repository";

export class ArticleRepositoryImpl implements ArticleRepository {
  constructor(private database: Database) {}

  create(article: Omit<Article, "id">): Promise<Article> {
    const db = this.database.getConnection();
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Article | null> {
    throw new Error("Method not implemented.");
  }
  findByTitle(title: string): Promise<Article> {
    throw new Error("Method not implemented.");
  }
  findByUserId(user_id: string): Promise<Article> {
    throw new Error("Method not implemented.");
  }
  findAll(filter: Map<string, string>[]): Promise<Article[]> {
    throw new Error("Method not implemented.");
  }
}
