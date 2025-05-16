import { IsBoolean, IsString } from 'class-validator';

import { ImportProductsResult } from 'src/products/interfaces/products';

import { ApiProperty } from '@nestjs/swagger';

export class ImportProductsResultDto implements ImportProductsResult {
  @ApiProperty({
    example: 'Import process started',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  success: boolean;
}
