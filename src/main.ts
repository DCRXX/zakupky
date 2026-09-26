import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const logger = new Logger('Bootstrap')

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {enableImplicitConversion: true},
    whitelist: true
  }))


  app.enableCors({
    origin: [
      ''
    ].filter(Boolean),
    credentials: true,
  })

  // Swagger
  const swaggerFulPath = '/docs'
  const swaggerAuth = basicAuth({
    challenge: true,
    users:{
      [process.env.SWAGGER_ADMIN!]: process.env.SWAGGER_PASSWORD!
    }
  })
  app.use(swaggerFulPath, swaggerAuth)

  const config = new DocumentBuilder()
  .setTitle('')
  .addBasicAuth()
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(swaggerFulPath, app, document)

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`\n Server Running! \n Port: ${port}`)
  logger.log(`Swagger Start on: ${process.env.BASE_URL}${swaggerFulPath}`)
  
}
bootstrap();
