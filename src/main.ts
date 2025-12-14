import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './modules/filters/all-exceptions.filter';
import { LoggingService } from './modules/logger/logging.service';
import { JwtAuthGuard } from './modules/auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalGuards(new JwtAuthGuard());
  process.on('uncaughtException', (e) => logger.error(e.message, e.stack));
  process.on('unhandledRejection', (r) => logger.error(String(r)));
  await app.listen(4000);
}
bootstrap();
