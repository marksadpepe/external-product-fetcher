import { IsNumber, IsOptional, IsString } from 'class-validator';

import { GetProductsQueryParams } from 'src/products/interfaces/products';

import { ApiProperty } from '@nestjs/swagger';

export class GetProductsQueryParamsDto implements GetProductsQueryParams {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  searchTitle?: string;
}
