import { Article } from "../entities/article.entities";

export interface ArticleRepository {
  create(article: Omit<Article, "id">): Promise<Article>;
  findById(id: string): Promise<Article | null>;
  findByTitle(title: string): Promise<Article>;
  findByUserId(user_id: string): Promise<Article>;
  findAll(filter: Map<string, string>[]): Promise<Article[]>;
}
