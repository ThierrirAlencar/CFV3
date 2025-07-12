import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const host = process.env.API_HOST || "0.0.0.0";
  const port = process.env.API_PORT || 3445;

  const app = await NestFactory.create(AppModule);
  await app.listen(port,host);

  app.use((req, res:Response, next) => {
    console.log(`Nova requisição recebida: ${req.method} ${req.url} `);
    next();
  });
  
  //Utilizado para validar entradas do body a partir de DTOS
  app.useGlobalPipes(new ValidationPipe())

  console.log("Running App At: ",`https://${host}:${port}`)
}
bootstrap();
