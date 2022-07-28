import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //se crea las opcions para la documentacion
  //swagger

  const options = new DocumentBuilder()
    .setTitle('Documentacion Tuitter')
    .setDescription('Api sobre tuiter trabajando en NESTJS')
    .setVersion('1.0')
    .addTag('prueba general')
    .build();

  //se crea un documento para la documentacion
  //swagger

  const document = SwaggerModule.createDocument(app, options);

  //genero mi swager
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  //validamos los datos que llegan a nuestros metodos
  //transformat a el dato q necesita
  //whitelist de muchos datos solo recibe el dato que esta en el q se establece q recibe
  //solo lo q esperamos lo demas es ignorado
  //forbidnonwhitelisted filtra los datos que se esperan si no es lo q se espera da el error 400
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  await app.listen(3000);
}
bootstrap();
