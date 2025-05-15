import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ImportProductsResultDto } from 'src/products/dto/response/import-products-response.dto';
import { ProductsService } from 'src/products/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('import')
  async importProducts(): Promise<ImportProductsResultDto> {
    // log

    return await this.productsService.importProducts();
  }
}
