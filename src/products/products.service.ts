import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  ImportProductsResult,
  ImportProductsData,
  ProductItem,
  ProductCategory,
  ProductAvailabilityStatus,
  ProductRawItem,
  GetCalculatedProducts,
  GetProductsQueryParams,
  ProductsDataResponse,
} from 'src/products/interfaces/products';

import { ProductDataMapper } from 'src/products/product.data-mapper';

import { InjectQueue } from '@nestjs/bull';
import { QueueNames, ProcessorNames } from 'src/common/queue';

import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  protected readonly logger = new Logger(ProductsService.name);

  private readonly productCategoriesRecord: Record<string, ProductCategory> = {
    [ProductCategory.Beauty.toString().toLowerCase()]: ProductCategory.Beauty,
    [ProductCategory.Fragrances.toString().toLowerCase()]:
      ProductCategory.Fragrances,
    [ProductCategory.Furniture.toString().toLowerCase()]:
      ProductCategory.Furniture,
    [ProductCategory.Groceries.toString().toLowerCase()]:
      ProductCategory.Groceries,
  };

  private readonly productAvailabilityStatusRecord: Record<
    string,
    ProductAvailabilityStatus
  > = {
    [ProductAvailabilityStatus.InStock.toString().toLowerCase()]:
      ProductAvailabilityStatus.InStock,
    [ProductAvailabilityStatus.LowStock.toString().toLowerCase()]:
      ProductAvailabilityStatus.LowStock,
  };

  constructor(
    @InjectQueue(QueueNames.Products) private readonly productsQueue: Queue,
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    private readonly productDataMapper: ProductDataMapper,
  ) {}

  async importProducts(
    data: ImportProductsData,
  ): Promise<ImportProductsResult> {
    try {
      this.logger.log('Adding a new job to queue');

      await this.productsQueue.add(
        ProcessorNames.RequestExternalProducts,
        data,
        { removeOnComplete: true, removeOnFail: true },
      );

      return { message: 'Import process started', success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { message: err.message, success: false };
      }

      throw new InternalServerErrorException();
    }
  }

  async getProducts(
    queryParams: GetProductsQueryParams,
  ): Promise<ProductsDataResponse> {
    const { limit = 10, page = 1, searchTitle } = queryParams;
    const actualPage = page ? Number(page) : 1;
    const actualLimit = limit ? Number(limit) : 10;

    const skip = (actualPage - 1) * actualLimit;

    const query = this.productsRepository.createQueryBuilder('product');

    if (searchTitle) {
      query.where('product.title ILIKE :searchTitle', {
        searchTitle: `%${searchTitle}%`,
      });
    }

    query.orderBy('product.id', 'ASC').skip(skip).limit(actualLimit);

    const [data, total] = await query.getManyAndCount();

    const totalPages = Math.ceil(total / actualLimit);

    return {
      products: data.map((product) =>
        this.productDataMapper.toProductItem(product),
      ),
      meta: {
        total,
        page: actualPage,
        limit: actualLimit,
        totalPages,
        hasNextPage: totalPages > actualPage,
        hasPreviousPage: actualPage > 1,
      },
    };
  }

  async getProduct(id: string): Promise<ProductItem> {
    const product = await this.productsRepository.findOne({
      where: { externalId: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return this.productDataMapper.toProductItem(product);
  }

  async saveProductsToDb(data: ProductRawItem[]): Promise<void> {
    if (!data.length) {
      return;
    }

    const convertedProducts = data.map((item) =>
      this.convertProductFields(item),
    );

    const { productsToCreate, productsToDelete } =
      await this.calculateProductsToSave(convertedProducts);

    if (productsToDelete.length) {
      await this.productsRepository.remove(productsToDelete);
    }

    if (productsToCreate.length) {
      const products = productsToCreate.map((rawProduct) => {
        const { id: externalId, ...rest } =
          this.convertProductFields(rawProduct);

        return this.productsRepository.create({ ...rest, externalId });
      });

      await this.productsRepository.save(products);
    }
  }

  private convertProductFields(rawProduct: ProductRawItem): ProductItem {
    const { availabilityStatus, category, ...rest } = rawProduct;

    const candidateCategory = category.toLowerCase();
    const candidateAvailabilityStatus = availabilityStatus.toLowerCase();

    if (!this.productCategoriesRecord[candidateCategory]) {
      this.logger.error(
        `Product category ${category} not found in the inner record object`,
      );
    }

    if (!this.productAvailabilityStatusRecord[candidateAvailabilityStatus]) {
      this.logger.error(
        `Product availability status ${availabilityStatus} not found in the inner record object`,
      );
    }

    return {
      ...rest,
      category: this.productCategoriesRecord[candidateCategory],
      availabilityStatus:
        this.productAvailabilityStatusRecord[candidateAvailabilityStatus],
    };
  }

  private async calculateProductsToSave(
    externalProducts: ProductItem[],
  ): Promise<GetCalculatedProducts> {
    const productsToCreate: ProductItem[] = [];

    const existingProducts = await this.productsRepository.find();

    const externalProductIds = new Set(externalProducts.map(({ id }) => id));
    const existingProductsMap = new Map<number, ProductEntity>(
      existingProducts.map((product) => [product.externalId, product]),
    );

    externalProducts.forEach((externalProduct) => {
      if (!existingProductsMap.has(externalProduct.id)) {
        productsToCreate.push(externalProduct);
      }
    });

    const productsToDelete = existingProducts.filter(
      ({ externalId }) => !externalProductIds.has(externalId),
    );

    return { productsToCreate, productsToDelete };
  }
}
