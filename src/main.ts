import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //za sve rute da ga koristimo
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, //ne daje nepoznata polja u dto
      //disableErrorMessages: true
      transform: true, //konvertuje iz json formata u zeljeni dto :)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
