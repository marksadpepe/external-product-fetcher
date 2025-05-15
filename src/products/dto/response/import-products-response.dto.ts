import { IsBoolean, IsString } from 'class-validator';

import { ImportProductsResult } from 'src/products/interfaces/products';

export class ImportProductsResultDto implements ImportProductsResult {
  @IsString()
  message: string;

  @IsBoolean()
  success: boolean;
}
