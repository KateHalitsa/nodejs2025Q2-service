// src/logger/logging.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggingService {
  private level = process.env.LOG_LEVEL || 'info';
  private logFile = 'app.log';
  private maxSize = 50 * 1024; // 50 KB

  private write(message: string) {
    if (
      fs.existsSync(this.logFile) &&
      fs.statSync(this.logFile).size > this.maxSize
    ) {
      fs.renameSync(this.logFile, `${this.logFile}.${Date.now()}`);
    }
    fs.appendFileSync(this.logFile, message + '\n');
    process.stdout.write(message + '\n');
  }

  log(msg: string) {
    this.write(`[INFO] ${msg}`);
  }
  warn(msg: string) {
    this.write(`[WARN] ${msg}`);
  }
  error(msg: string, trace?: string) {
    this.write(`[ERROR] ${msg} ${trace ?? ''}`);
  }
}
