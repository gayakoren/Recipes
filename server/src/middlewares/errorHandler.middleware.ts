import { NextFunction, Request, Response } from 'express';

import { HttpError } from './../exceptions/httpErrors';
import { HttpStatusCode } from 'axios';

async function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    console.error(`Error: ${err.message}, Status: ${err.status}, Extended Status Code: ${err.extendedStatusCode}`);
    res.status(err.status).send({
      extendedStatusCode: err.extendedStatusCode,
      message: err.message,
    });
  } else {
    res.status(HttpStatusCode.InternalServerError).json({ message: `Internal server error` })
  }
}

export default errorHandler;
