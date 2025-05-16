import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BullModule } from '@nestjs/bull';
import { QueueNames } from 'src/common/queue';

import { ProductsProcessor } from 'src/products/products.processor';

import { ExternalApiModule } from 'src/external-api/external-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';

import { ProductDataMapper } from 'src/products/product.data-mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    BullModule.registerQueue({
      name: QueueNames.Products,
    }),
    ExternalApiModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsProcessor, ProductDataMapper],
})
export class ProductsModule {}
