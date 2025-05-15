import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  ProductItem,
  ProductsDataResponse,
  ProductDimensionsItem,
  ProductCategory,
  ProductAvailabilityStatus,
  ProductMetaItem,
  ProductReviewItem,
  ProductMetaResponse,
} from 'src/products/interfaces/products';

import { PRODUCT_SWAGGER_EXAMPLE } from 'src/common/product';

import { ApiProperty } from '@nestjs/swagger';

export class ProductDimensionsItemDto implements ProductDimensionsItem {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  depth: number;
}

export class ProductReviewItemDto implements ProductReviewItem {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  date: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  reviewerName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  reviewerEmail: string;
}

export class ProductMetaItemDto implements ProductMetaItem {
  @ApiProperty({
    type: String,
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  updatedAt: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  barcode: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  qrCode: string;
}

export class ProductItemDto implements ProductItem {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ProductCategory,
    enumName: 'ProductCategory',
  })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  discountPercentage: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    type: [String],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    type: String,
  })
  @IsString()
  brand: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  sku: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    type: ProductDimensionsItemDto,
  })
  @ValidateNested()
  @Type(() => ProductDimensionsItemDto)
  dimensions: ProductDimensionsItemDto;

  @ApiProperty({
    type: String,
  })
  @IsString()
  warrantyInformation: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  shippingInformation: string;

  @ApiProperty({
    enum: ProductAvailabilityStatus,
    enumName: 'ProductAvailabilityStatus',
  })
  @IsEnum(ProductAvailabilityStatus)
  availabilityStatus: ProductAvailabilityStatus;

  @ApiProperty({
    type: [ProductReviewItemDto],
    isArray: true,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProductReviewItemDto)
  reviews: ProductReviewItemDto[];

  @ApiProperty({
    type: String,
  })
  @IsString()
  returnPolicy: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  minimumOrderQuantity: number;

  @ApiProperty({
    type: ProductMetaItemDto,
  })
  @ValidateNested()
  @Type(() => ProductMetaItemDto)
  meta: ProductMetaItemDto;

  @ApiProperty({
    type: String,
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    type: [String],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];
}

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
