import dotenv from 'dotenv';

dotenv.config();

export const Environment = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    url: process.env.APP_URL,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expireIn: process.env.TOKEN_EXPIRE_IN,
  },
};
