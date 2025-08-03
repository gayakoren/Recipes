import { HttpStatusCode } from 'axios';

export abstract class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public extendedStatusCode?: number
  ) {
    super(message);
    this.status = status;
    this.extendedStatusCode = extendedStatusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(public message: string) {
    super(HttpStatusCode.BadRequest, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(
    public message: string,
    extendedStatusCode?: number
  ) {
    super(HttpStatusCode.NotFound, message, extendedStatusCode);
  }
}

export default {
  BadRequestError,
  HttpError,
  NotFoundError,
};
