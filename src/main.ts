import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ENV } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet.default());

  app.setGlobalPrefix(ENV.app.api.prefix);

  app.enableCors({ exposedHeaders: ['Content-Disposition'] });

  app.use(
    rateLimit.default({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
  }));

  const basicAuthUser = ENV.swagger.user;
  const basicAuthPassword = ENV.swagger.password;

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [basicAuthUser]: basicAuthPassword,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(ENV.app.api.title)
    .setDescription(ENV.app.api.description)
    .setVersion(ENV.app.api.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      caches: 'no-cache',
    },
  });

  await app.listen(ENV.port || 3000);
}
bootstrap();
