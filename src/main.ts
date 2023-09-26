import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { PrismaHelper } from './helpers/prisma.helper';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(helmet());

  app.get(PrismaHelper, { strict: false });
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
  .setTitle('GLogger')
  .setDescription('Log capture server, connection is only allowed for updated IPs.')
  .setVersion('1.0')
  .addTag('Logs')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(3000);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT') ?? 3000);

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
}
bootstrap();
