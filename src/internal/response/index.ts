import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]> | string[];
  meta?: {
    timestamp: string;
    path: string;
    [key: string]: any;
  };
}

export class AppError extends Error {
  statusCode: number;
  errors?: Record<string, string[]> | string[];

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errors?: Record<string, string[]> | string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function successResponse<T>(
  c: Context,
  data: T,
  message: string = ReasonPhrases.OK,
  statusCode: number = StatusCodes.OK
): Response {
  const response: ApiResponse<T> = {
    success: true,
    statusCode,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      path: c.req.path,
    },
  };

  return c.json(response, statusCode as any);
}

export function errorResponse(
  c: Context,
  message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  errors?: Record<string, string[]> | string[]
): Response {
  const response: ApiResponse<undefined> = {
    success: false,
    statusCode,
    message,
    errors,
    meta: {
      timestamp: new Date().toISOString(),
      path: c.req.path,
    },
  };

  return c.json(response, statusCode as any);
}

export const errorHandler = async (err: Error, c: Context) => {
  if (err instanceof AppError) {
    return errorResponse(c, err.message, err.statusCode, err.errors);
  }

  if (err instanceof HTTPException) {
    return errorResponse(c, err.message, err.status);
  }

  return errorResponse(
    c,
    ReasonPhrases.INTERNAL_SERVER_ERROR,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
