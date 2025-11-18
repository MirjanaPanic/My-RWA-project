import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, //odbija zahtev ako ima visak polja
      //disableErrorMessages: true
      transform: true, //konvertuje iz json formata u zeljeni dto :)
    }),
  );
  app.enableCors({ origin: 'http://localhost:4200' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
