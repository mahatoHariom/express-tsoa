import { ErrorResponsePayload } from '../common/responses/error-response-payload';
import { Exception } from '../common/exceptions/Exception'
import { ErrorRequestHandler, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import { Prisma } from '@prisma/client';

export const errorHandler: ErrorRequestHandler = (err: Error | Exception, req, res, next: NextFunction) => {
  console.log(err);

  let statusCode = 500;
  let response = new ErrorResponsePayload(err);

  if (err instanceof Exception) {
    statusCode = err.getter().statusCode;
  } else if (err instanceof ValidateError) {
    statusCode = err.status;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    response = new ErrorResponsePayload(new Error('Prisma Validation Error'));
  }

  res.status(statusCode).send(response);
};
