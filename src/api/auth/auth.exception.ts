import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthApiException extends HttpException {
  constructor(
    message: string,
    private errorCode: string,
    private statusCode: HttpStatus,
    private rawData?: object,
  ) {
    super(message, statusCode);
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getStatusCode(): HttpStatus {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }

  getRawData<T>(): T | undefined {
    return this.rawData as T;
  }
}
