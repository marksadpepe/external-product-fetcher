import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ImportProductsResult } from 'src/products/interfaces/products';

@Injectable()
export class ProductsService {
  constructor() {}

  async importProducts(): Promise<ImportProductsResult> {
    try {
      return { message: 'Import process started', success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { message: err.message, success: false };
      }

      throw new InternalServerErrorException();
    }
  }
}
