import * as dotenv from 'dotenv';

export function getOrmConfig() {
  let OrmConfig;
  const envConfig = dotenv.config().parsed;
  const settings = {
    username: envConfig.POSTGRES_USER,
    password: envConfig.POSTGRES_PASSWORD,
    database: envConfig.POSTGRES_DB,
  };

  if (process.env.NODE_ENV !== 'test') {
    OrmConfig = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: settings.username,
      password: settings.password,
      database: settings.database,
      entities: ['**/**.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    };
  } else {
    OrmConfig = {
      type: 'postgres',
      host: 'localhost',
      port: 5444,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    };
  }
  return OrmConfig;
}
