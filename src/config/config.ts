import { config } from "dotenv";
config();
export const _conf = {
  port: process.env.PORT,
  env: process.env.ENV,
  salt: 10,
  jwt_secret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGOURI,
  limit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
};
