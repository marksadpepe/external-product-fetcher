import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DbNameStrategy } from 'src/db/db-name.strategy';
import { config } from 'src/config/config';
import { ProductsModule } from './products/products.module';

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
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
