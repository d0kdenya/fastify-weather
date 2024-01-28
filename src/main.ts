import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyStatic from '@fastify/static';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');

  await app.enableCors();

  await app.register(fastifyStatic, {
    root: __dirname,
  });

  const config = new DocumentBuilder()
    .setTitle('Погода на Fastify!')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Dan Losev')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap();
