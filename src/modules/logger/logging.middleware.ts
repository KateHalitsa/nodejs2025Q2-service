// src/logger/logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `REQ ${req.method} ${req.url} body=${JSON.stringify(req.body)}`,
    );
    res.on('finish', () => {
      this.logger.log(`RES ${req.method} ${req.url} status=${res.statusCode}`);
    });
    next();
  }
}
