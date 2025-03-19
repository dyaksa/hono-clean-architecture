import { ResponseFormatter } from "../interface/response.formatter.interface";
import { Context } from "hono";
import { ReasonPhrases } from "http-status-codes";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  errors?: Record<string, string[]> | string[];
  meta?: {
    timestamp: string;
    path: string;
    [key: string]: any;
  };
}

export class SuccessResponse implements ResponseFormatter {
  constructor(
    private readonly c: Context,
    private readonly statusCode: number
  ) {}
  format<T>(
    data?: T,
    message?: string,
    errors?: Record<string, string[]> | string[]
  ): ApiResponse<T> {
    return {
      success: true,
      message: message || ReasonPhrases.OK,
      statusCode: this.statusCode,
      data,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
        path: this.c.req.path,
      },
    };
  }
}

export class ErrorResponse implements ResponseFormatter {
  constructor(
    private readonly c: Context,
    private readonly statusCode: number
  ) {}

  format<T>(
    data?: T,
    message?: string,
    errors?: Record<string, string[]> | string[]
  ): ApiResponse<T> {
    return {
      success: false,
      message: message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      statusCode: this.statusCode,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
        path: this.c.req.path,
      },
    };
  }
}
