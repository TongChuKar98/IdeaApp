import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {Logger} from '@nestjs/common'
import { AppModule } from './app.module';
import { from } from 'rxjs';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log('Server running on http:localhost:${port}', 'Boostrap');
}
bootstrap();
