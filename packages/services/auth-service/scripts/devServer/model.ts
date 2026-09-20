import * as path from "node:path";
import { type StringValue } from "ms";
import { z } from "zod";
import { PROJECT_ROOT } from "../../src/model/env";

const CONFIG_FILE_PATH = path.join(PROJECT_ROOT, "devServerConfig.json");

const LOCAL_CONFIG_FILE_PATH = path.join(PROJECT_ROOT, ".env.local");

const APP_FILE_PATH = path.join(PROJECT_ROOT, "src", "app.ts");

const postgresConnectionRegex =
  /^postgres(ql)?:\/\/([^:@\s]+)(:([^@\s]*))?@([^:/\s]+)(:(\d+))?\/([^?\s]+)(\?.*)?$/;

const msRegex =
  /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i;

const isStringValue = (value: unknown): value is StringValue => {
  if (typeof value !== "string") return false;
  if (value.length === 0 || value.length > 100) return false;

  const match = msRegex.exec(value);
  if (!match) return false;

  return Number.isFinite(Number.parseFloat(match[1]));
};

const stringValue = z.custom<StringValue>(isStringValue, {
  message: "Must be a valid duration, e.g. '15m', '7d', '1 hour'",
});

const ENV_CONFIG = z.object({
  AUTH_SERVICE_PORT: z.coerce
    .number("Invalid port type")
    .int("Port must be an integer")
    .min(49152, "Port must be more then 49152")
    .max(65535, "Port must be less then 65535"),
  AUTH_SERVICE_DATABASE_URL: z
    .string("Invalid database connection string type")
    .regex(postgresConnectionRegex, "Invalid PostgreSQL connection string format"),
  AUTH_SERVICE_JWT_ACCESS_TOKEN_SECRET: z.uuid(
    "Jwt access token secret must be a valid UUID"
  ),
  AUTH_SERVICE_JWT_ACCESS_TOKEN_EXPIRES_IN: stringValue,
  AUTH_SERVICE_JWT_REFRESH_TOKEN_SECRET: z.uuid(
    "Jwt refresh token secret must be a valid UUID"
  ),
  AUTH_SERVICE_JWT_REFRESH_TOKEN_EXPIRES_IN: stringValue,
});

type Config = z.infer<typeof ENV_CONFIG>;

const parseConfig = (input: Record<string, unknown>) => ENV_CONFIG.parse(input);

export {
  type Config,
  parseConfig,
  ENV_CONFIG,
  isStringValue,
  CONFIG_FILE_PATH,
  LOCAL_CONFIG_FILE_PATH,
  APP_FILE_PATH,
};
