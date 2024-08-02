import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { JWT } from './guards/JWT.guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const jwtGuard = new JWT(new HttpService(), new ConfigService());
  app.useGlobalGuards(jwtGuard);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();