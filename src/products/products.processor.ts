import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { QueueNames, ProcessorNames } from 'src/common/queue';

import { ProductsService } from 'src/products/products.service';

import { ExternalApiService } from 'src/external-api/external-api.service';

import { config } from 'src/config/config';

import {
  ImportProductsData,
  ProductRawDataResponse,
} from 'src/products/interfaces/products';

@Processor(QueueNames.Products)
export class ProductsProcessor {
  protected readonly logger = new Logger(ProductsProcessor.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  @Process({
    name: ProcessorNames.RequestExternalProducts,
    concurrency: 5,
  })
  async handleRequestExternalProducts(
    job: Job<ImportProductsData>,
  ): Promise<void> {
    const { products } =
      await this.externalApiService.fetchExternalData<ProductRawDataResponse>(
        <string>config.get('app.productsUrl'),
        job.data,
      );

    await this.productsService.saveProductsToDb(products);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error): void {
    this.logger.error(
      `Processing job ${job.id} of type ${job.name} with data ${job.data} was failed with error: ${error}`,
    );
  }

  @OnQueueError()
  onError(error: Error): void {
    this.logger.error(`Queue was failed with error: ${error}`);
  }

  @OnQueueActive()
  onActive(job: Job): void {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onCompete(job: Job): void {
    this.logger.log(`Job ${job.id} of type ${job.name} was completed`);
  }
}
