
import { ConnectionOptions } from 'typeorm';


const settings = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
};

const config: ConnectionOptions = {
  type: 'postgres',
  url: `postgres://${settings.user}:${settings.password}@${settings.host}:5432/${settings.database}`,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export default config;