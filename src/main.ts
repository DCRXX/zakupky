import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const Domain = process.env.DOMAIN
export const isDev = process.env.NODE_ENV !== 'production'
export const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const logger = new Logger('Bootstrap')

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true
  }))


  app.enableCors({
    origin: [
      ''
    ].filter(Boolean),
    credentials: true,
  })

  // Swagger
  const apiFulPath = '/docs'
  const apiAuth = basicAuth({
    challenge: true,
    users: {
      [process.env.API_ADMIN!]: process.env.API_PASSWORD!
    }
  })
  app.use(apiFulPath, apiAuth)

  const config = new DocumentBuilder()
    .setTitle('API-Zakypky')
    .addBasicAuth()
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    apiFulPath,
    apiReference({
      spec: {
        content: document,
      },
      theme: 'deepSpace', 
      layout: 'classic',
      darkMode: true,
      hideModels: false,
      searchHotKey: 'k',
    })
  )

  await app.listen(port, '0.0.0.0');

  logger.log(`\n Server Running! \n Port: ${port} \n Domain:${Domain}`)
  logger.log(`Scalar Start on: ${isDev ? `http://${Domain}:${port}${apiFulPath}` : `https://${Domain}${apiFulPath}`}`)

}
bootstrap();
