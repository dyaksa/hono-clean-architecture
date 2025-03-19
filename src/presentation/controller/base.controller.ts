import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../infrastructure/http/response/response.formatter";
import {
  AppError,
  NotFoundError,
  DomainError,
  ConflictError,
} from "../../internal/errors/errors";
import {
  AppErrorMapper,
  NotFoundErrorMapper,
  DomainErrorMapper,
  HTTPExceptionMapper,
  ConflictErrorMapper,
} from "../../infrastructure/http/error/error.mapper";
import { HTTPException } from "hono/http-exception";

export abstract class BaseController {
  private readonly errorsMappers = new Map<string, new () => any>();

  constructor() {
    this.registerErrorMapper();
  }

  private registerErrorMapper() {
    this.errorsMappers.set(AppError.name, AppErrorMapper);
    this.errorsMappers.set(NotFoundError.name, NotFoundErrorMapper);
    this.errorsMappers.set(DomainError.name, DomainErrorMapper);
    this.errorsMappers.set(HTTPException.name, HTTPExceptionMapper);
    this.errorsMappers.set(ConflictError.name, ConflictErrorMapper);
  }

  protected ok<T>(c: Context, message: string, data: T): Response {
    const formatter = new SuccessResponse(c, StatusCodes.OK);
    const response = formatter.format(data, message);
    return c.json(response, StatusCodes.OK);
  }

  protected created<T>(c: Context, message: string, data?: T): Response {
    const formatter = new SuccessResponse(c, StatusCodes.CREATED);
    const response = formatter.format(data, message);
    return c.json(response, StatusCodes.CREATED);
  }

  protected noContent(c: Context): Response {
    return c.json(null, StatusCodes.NO_CONTENT as any);
  }

  protected error(c: Context, err: Error): Response {
    const mapperClass =
      this.errorsMappers.get(err.constructor.name) || AppErrorMapper;

    const mapper = new mapperClass();
    const { statusCode, message, errors } = mapper.map(err);

    const formatter = new ErrorResponse(c, statusCode);
    const response = formatter.format(undefined, message, errors);

    return c.json(response, statusCode);
  }
}
