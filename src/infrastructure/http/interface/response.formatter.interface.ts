export interface ResponseFormatter {
  format<T>(
    data?: T,
    message?: string,
    errors?: Record<string, string[]> | string[]
  ): any;
}
