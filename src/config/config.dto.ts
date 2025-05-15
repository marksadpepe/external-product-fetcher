export interface ConfigDto {
  app: {
    productsUrl: string;
    port: number;
  };
  database: {
    url: string;
    logging: boolean;
    synchronize: boolean;
    migrationsRun: boolean;
  };
  bull: {
    redis: {
      url: string;
    };
    limiter: {
      max: number;
      duration: number;
      bounceBack: boolean;
    };
  };
}
