import { HTTPException } from "hono/http-exception";
import {
  AppError,
  NotFoundError,
  DomainError,
} from "../../../internal/errors/errors";
import { ErrorMapper } from "../interface/error.mapper.interface";
import { StatusCodes } from "http-status-codes";

export class AppErrorMapper implements ErrorMapper {
  map(error: AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
    };
  }
}

export class NotFoundErrorMapper implements ErrorMapper {
  map(error: NotFoundError) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      message: error.message,
    };
  }
}

export class ConflictErrorMapper implements ErrorMapper {
  map(error: Error) {
    return {
      statusCode: StatusCodes.CONFLICT,
      message: error.message,
    };
  }
}

export class DomainErrorMapper implements ErrorMapper {
  map(error: DomainError) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message,
    };
  }
}

export class HTTPExceptionMapper implements ErrorMapper {
  map(error: HTTPException) {
    return {
      status: error.status,
      message: error.message,
      res: error.res,
    };
  }
}

export class DefaultErrorMapper implements ErrorMapper {
  map(error: Error) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
}
