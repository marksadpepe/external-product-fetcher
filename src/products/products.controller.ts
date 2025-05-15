import {
  Controller,
  Logger,
  Get,
  Post,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

import { ImportProductsDataDto } from 'src/products/dto/requests/import-products-request.dto';
import { ImportProductsResultDto } from 'src/products/dto/responses/import-products-response.dto';
import { GetProductsQueryParamsDto } from 'src/products/dto/requests/get-products-request.dto';
import { ProductsDataResponseDto } from 'src/products/dto/responses/get-products-response.dto';
import { ProductsService } from 'src/products/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  protected readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @ApiBody({
    type: ImportProductsDataDto,
  })
  @ApiResponse({
    status: 201,
    type: ImportProductsResultDto,
  })
  @Post('import')
  async importProducts(
    @Body() data: ImportProductsDataDto,
  ): Promise<ImportProductsResultDto> {
    this.logger.log('Import products');

    return await this.productsService.importProducts(data);
  }

  @ApiResponse({
    status: 200,
    type: ProductsDataResponseDto,
  })
  @Get()
  async getProducts(@Query() query: GetProductsQueryParamsDto): Promise<any> {
    this.logger.log('GET products request');

    return await this.productsService.getProducts(query);
  }
}
