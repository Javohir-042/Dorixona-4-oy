import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = Number(process.env.PORT ?? 3000);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Dorixona')
    .setDescription('Dorixona dori sotadi')
    .setVersion('0.1')
    .addTag('')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build()

  const documentCreator = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentCreator)




  await app.listen(PORT, () => console.log('Server running on port', PORT));
}
start();
