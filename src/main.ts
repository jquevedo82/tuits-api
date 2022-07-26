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

  await app.listen(3000);
}
bootstrap();
