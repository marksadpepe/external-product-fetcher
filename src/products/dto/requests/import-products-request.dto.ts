import { IsNumber, IsOptional } from 'class-validator';

import { ImportProductsData } from 'src/products/interfaces/products';

import { ApiProperty } from '@nestjs/swagger';

export class ImportProductsDataDto implements ImportProductsData {
  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  skip?: number;
}
