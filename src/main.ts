import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'src/config/config';

async function bootstrap() {
  const port = <number>config.get('app.port');

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    Logger.log(`Listening for requests on port: ${port}`, 'NestApplication');
  });
}
bootstrap();
