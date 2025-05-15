import { createProfiguration } from '@golevelup/profiguration';

import { ConfigDto } from 'src/config/config.dto';

export const config = createProfiguration<ConfigDto>({
  app: {
    productsUrl: {
      default: '',
      env: 'PRODUCTS_URL',
    },
    port: {
      default: 4000,
      env: 'APP_PORT',
    },
  },
  database: {
    url: {
      default: '',
      env: 'DATABASE_URL',
    },
    logging: {
      default: false,
      env: 'DATABASE_LOGGING',
    },
    synchronize: {
      default: false,
      env: 'DATABASE_SYNCHRONIZE',
    },
    migrationsRun: {
      default: false,
      env: 'DATABASE_MIGRATIONS_RUN',
    },
  },
  bull: {
    redis: {
      url: {
        default: '',
        env: 'BULL_REDIS_URL',
      },
    },
    limiter: {
      max: {
        default: 100,
        env: 'BULL_LIMITER_MAX',
      },
      duration: {
        default: 1000,
        env: 'BULL_LIMITER_DURATION',
      },
      bounceBack: {
        default: false,
        env: 'BULL_LIMITER_BOUNCE_BACK',
      },
    },
  },
});
