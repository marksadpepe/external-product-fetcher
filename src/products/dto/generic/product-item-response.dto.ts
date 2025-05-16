import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  ProductItem,
  ProductDimensionsItem,
  ProductCategory,
  ProductAvailabilityStatus,
  ProductMetaItem,
  ProductReviewItem,
} from 'src/products/interfaces/products';

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
