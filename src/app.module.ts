import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DbNameStrategy } from 'src/db/db-name.strategy';
import { config } from 'src/config/config';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bull';
import { ExternalApiModule } from './external-api/external-api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: <string>config.get('database.url'),
      autoLoadEntities: true,
      synchronize: <boolean>config.get('database.synchronize'),
      migrationsRun: <boolean>config.get('database.migrationsRun'),
      logging: <boolean>config.get('database.logging'),
      namingStrategy: new DbNameStrategy(),
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
    }),
    BullModule.forRoot({
      url: <string>config.get('bull.redis.url'),
      limiter: {
        max: <number>config.get('bull.limiter.max'),
        duration: <number>config.get('bull.limiter.duration'),
        bounceBack: <boolean>config.get('bull.limiter.bounceBack'),
      },
      prefix: 'products',
    }),
    ProductsModule,
    ExternalApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
