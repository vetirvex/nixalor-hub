import "dotenv/config";
import { StringValue } from "ms";

const IS_PRD = process.env.NODE_ENV === "production";
const PORT = Number(process.env.AUTH_SERVICE_PORT);
const DATABASE_URL = process.env.AUTH_SERVICE_DATABASE_URL!;
const PROJECT_ROOT = process.cwd();
const JWT_ACCESS_TOKEN_SECRET = process.env.AUTH_SERVICE_JWT_ACCESS_TOKEN_SECRET!;
const JWT_ACCESS_TOKEN_EXPIRES_IN: StringValue = process.env
  .AUTH_SERVICE_JWT_ACCESS_TOKEN_EXPIRES_IN! as StringValue;
const JWT_REFRESH_TOKEN_SECRET = process.env.AUTH_SERVICE_JWT_REFRESH_TOKEN_SECRET!;
const JWT_REFRESH_TOKEN_EXPIRES_IN: StringValue = process.env
  .AUTH_SERVICE_JWT_REFRESH_TOKEN_EXPIRES_IN! as StringValue;

export {
  IS_PRD,
  PORT,
  DATABASE_URL,
  PROJECT_ROOT,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
};
