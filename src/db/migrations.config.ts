import { DataSource } from 'typeorm';

import { config } from 'src/config/config';

import { DbNameStrategy } from 'src/db/db-name.strategy';

export const dataSource = new DataSource({
  type: 'postgres',
  url: <string>config.get('database.url'),
  namingStrategy: new DbNameStrategy(),
  migrations: [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
});
