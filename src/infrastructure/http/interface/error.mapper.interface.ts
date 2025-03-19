export interface ErrorMapper {
  map(error: Error): {
    statusCode?: number;
    message: string;
    errors?: Record<string, string[]> | string[];
  };
}
