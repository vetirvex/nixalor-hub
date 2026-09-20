import * as path from "node:path";
import { IS_PRD, PROJECT_ROOT } from "./env";

const baseLoggerConfig = {
  level: IS_PRD ? "info" : "debug",
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
    bindings: () => {
      return { app: "auth-service" };
    },
  },
};

const developmentConfig = {
  ...baseLoggerConfig,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      singleLine: false,
      translateTime: "HH:MM:ss Z",
    },
  },
};

const LOGGER_FILE_PATH = path.join(PROJECT_ROOT, "logs/app.log");

const productionConfig = {
  ...baseLoggerConfig,
  transport: {
    targets: [
      {
        target: "pino/file",
        level: "info",
        options: {
          destination: 1,
        },
      },
      {
        target: "pino/file",
        level: "info",
        options: {
          destination: LOGGER_FILE_PATH,
          mkdir: true,
        },
      },
    ],
  },
};

const loggerConfig = IS_PRD ? productionConfig : developmentConfig;

export { loggerConfig };
