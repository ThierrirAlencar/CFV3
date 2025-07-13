import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './interface/swaggerInterface';

async function bootstrap() {
  const host = process.env.API_HOST || "0.0.0.0";
  const port = process.env.API_PORT || 3445;

  const app = await NestFactory.create(AppModule);


  //Swagger and OpenAPI automatic documentation

  SwaggerModule.setup('docs', app, swaggerOptions);

  //Utilizado para validar entradas do body a partir de DTOS
  app.useGlobalPipes(new ValidationPipe())

  app.use((req, res:Response, next) => {
    console.log(`Nova requisição recebida: ${req.method} ${req.url} `);
    next();
  });



  await app.listen(port,host);
  console.log("Running App At: ",`http://${host}:${port} \nhttp://${host}:${port}/docs\nScalar documentation: https://control-financev3.apidocumentation.com`);
}
bootstrap();
