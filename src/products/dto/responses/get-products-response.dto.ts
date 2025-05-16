import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

import {
  ProductsDataResponse,
  ProductMetaResponse,
} from 'src/products/interfaces/products';

import { PRODUCT_SWAGGER_EXAMPLE } from 'src/common/product';

import { ProductItemDto } from 'src/products/dto/generic/product-item-response.dto';

import { ApiProperty } from '@nestjs/swagger';

export class ProductMetaResponseDto implements ProductMetaResponse {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  totalPages: number;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  hasNextPage: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  hasPreviousPage: boolean;
}

export class ProductsDataResponseDto implements ProductsDataResponse {
  @ApiProperty({
    type: [ProductItemDto],
    isArray: true,
    // NOTE: need to rewrite, maybe write a decorator to map example and types
    example: [PRODUCT_SWAGGER_EXAMPLE],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProductItemDto)
  products: ProductItemDto[];

  @ApiProperty({
    type: ProductMetaResponseDto,
    example: {
      total: 1,
      page: 1,
      limit: 1,
      totalPages: 1,
      hasNextPage: true,
      hasPreviousPage: true,
    },
  })
  @ValidateNested()
  @Type(() => ProductMetaResponseDto)
  meta: ProductMetaResponseDto;
}
