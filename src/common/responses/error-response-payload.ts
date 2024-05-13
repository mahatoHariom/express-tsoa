import httpStatus from 'http-status';
import { ValidateError } from 'tsoa';
import { Exception } from '../exceptions/Exception';


export class ErrorResponsePayload {
  message: string;

  constructor(err: Error | Exception | ValidateError) {
    // logical error
    if (err instanceof Exception) {
      const { message } = err.getter();
      this.message = message;
    }
    // tsoa validation error
    else if (err instanceof ValidateError) {
      this.message = 'The input values are invalid.';
    }

    // physical error
    else {
      this.message = httpStatus[500];
    }
  }
}
