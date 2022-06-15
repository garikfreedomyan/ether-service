// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
