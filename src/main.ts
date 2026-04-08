import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NutriBack API')
    .setDescription('The API endpoints and descriptions of the NutriBack API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  initSwagger(app);

  await app.listen(5001);
}

void bootstrap();
