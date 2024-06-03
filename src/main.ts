import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  /* Konfigurasi Swagger */
  const config = new DocumentBuilder()
    .setTitle("Anshar's Logger Server")
    .setDescription('by anshar for NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  /* Konfigurasi Winston logger */
  // const logger = winston.createLogger({
  //   level: 'info',
  //   format: winston.format.combine(
  //     winston.format.timestamp(),
  //     winston.format.printf(({ timestamp, level, message }) => {
  //       return `${timestamp} [${level}]: ${message}`;
  //     }),
  //   ),
  //   transports: [
  //     new winston.transports.Console(),
  //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
  //     new winston.transports.File({ filename: 'combined.log' }),
  //   ],
  // });

  // app.useLogger(logger);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
