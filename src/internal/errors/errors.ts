import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    public errors: Record<string, string[]> | string[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(
    public message: string,
    public statusCode: number = StatusCodes.NOT_FOUND
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
