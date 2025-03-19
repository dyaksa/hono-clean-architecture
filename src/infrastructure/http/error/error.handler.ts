import { HTTPException } from "hono/http-exception";
import {
  AppError,
  DomainError,
  NotFoundError,
} from "../../../internal/errors/errors";
import {
  AppErrorMapper,
  DefaultErrorMapper,
  DomainErrorMapper,
  HTTPExceptionMapper,
  NotFoundErrorMapper,
} from "./error.mapper";
import { Context } from "hono";
import { ErrorResponse } from "../response/response.formatter";

export class ErrorHandler {
  private readonly errorsMappers = new Map<string, new () => any>();

  constructor() {
    this.registerErrorMapper();
  }

  private registerErrorMapper() {
    this.errorsMappers.set(AppError.name, AppErrorMapper);
    this.errorsMappers.set(NotFoundError.name, NotFoundErrorMapper);
    this.errorsMappers.set(DomainError.name, DomainErrorMapper);
    this.errorsMappers.set(HTTPException.name, HTTPExceptionMapper);
  }

  public async handleError(err: Error, c: Context): Promise<Response> {
    const mapperClass =
      this.errorsMappers.get(err.constructor.name) || DefaultErrorMapper;

    const mapper = new mapperClass();
    const { statusCode, message, errors } = mapper.map(err);

    const formatter = new ErrorResponse(c, statusCode);
    const response = formatter.format(undefined, message, errors);

    return c.json(response, 500);
  }
}
