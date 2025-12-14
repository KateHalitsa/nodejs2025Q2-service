// src/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from '../logger/logging.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      this.logger.error(JSON.stringify(response));
      res.status(status).json(response);
    } else {
      this.logger.error('Unexpected error', String(exception));
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
