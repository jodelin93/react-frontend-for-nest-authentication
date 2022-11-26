import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(CookParser())
  app.enableCors({
    credentials:true,
    origin:["http://localhost:3000"]
  })
  await app.listen(8000);
}
bootstrap();
