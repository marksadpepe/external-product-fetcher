import {
  Injectable,
  InternalServerErrorException,
  Logger,
  HttpException,
} from '@nestjs/common';

import { QueryParams } from 'src/external-api/interfaces/url';

@Injectable()
export class ExternalApiService {
  protected readonly logger = new Logger(ExternalApiService.name);

  constructor() {}

  async fetchExternalData<T>(url: string, params?: QueryParams): Promise<T> {
    this.logger.log(`Fetching external data from: ${url}`);

    try {
      const { skip, limit } = params ?? {};

      const urlObj = new URL(url);

      if (limit) {
        urlObj.searchParams.append('limit', limit.toString());
      }

      if (skip) {
        urlObj.searchParams.append('skip', skip.toString());
      }

      const response = await fetch(urlObj.toString(), {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new HttpException(response.statusText, response.status);
      }

      return await (<T>response.json());
    } catch (err: unknown) {
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : 'Unknown error occurred',
      );
    }
  }
}
