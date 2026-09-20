import * as fs from "node:fs";
import { Config, LOCAL_CONFIG_FILE_PATH, parseConfig } from "./model";

const loadFromLocalEnv = async (): Promise<Config> => {
  if (!fs.existsSync(LOCAL_CONFIG_FILE_PATH)) {
    throw new Error("Cannot load config from local env. File does not exist");
  }

  const configFileData = await fs.promises.readFile(LOCAL_CONFIG_FILE_PATH, "utf8");

  const config: Record<string, unknown> = {};

  for (const rawLine of configFileData.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    config[key] = value;
  }

  return parseConfig(config);
};

export { loadFromLocalEnv };
